import type { Request, Response } from "express";
import mongoose from "mongoose";
import type { PipelineStage } from "mongoose";
import Order from "../../order/orderModel.js";
import Product from "../../product/productModel.js";

const LOW_STOCK_THRESHOLD = 5; // same as "Limited Stock" on the storefront
const ORDER_STATUSES = [
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;
// month and day boundaries use the server's timezone
const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const round2 = (n: number) => Math.round(n * 100) / 100;
const percentChange = (current: number, previous: number) =>
  previous === 0 ? null : round2(((current - previous) / previous) * 100);

export const getSellerDashboard = async (req: Request, res: Response) => {
  const sellerId = new mongoose.Types.ObjectId(req.user.id);

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfYesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  // Revenue = this seller's items in orders that are paid and not cancelled,
  // counted on the day they were paid (online: at payment, COD: on delivery).
  const paidItems = (from: Date, to?: Date): PipelineStage[] => [
    {
      $match: {
        "orderItems.sellerId": sellerId,
        orderStatus: { $ne: "Cancelled" },
        paidAt: { $gte: from, ...(to && { $lt: to }) },
      },
    },
    { $unwind: "$orderItems" },
    { $match: { "orderItems.sellerId": sellerId } }, // drop other sellers' items
  ];
  const lineTotal = {
    $multiply: ["$orderItems.price", "$orderItems.quantity"],
  };

  const revenueBetween = async (from: Date, to?: Date) => {
    const [row] = await Order.aggregate<{ revenue: number }>([
      ...paidItems(from, to),
      { $group: { _id: null, revenue: { $sum: lineTotal } } },
    ]);
    return round2(row?.revenue ?? 0);
  };

  const [
    todayRevenue,
    yesterdayRevenue,
    allTimeRevenue,
    thisMonthRevenue,
    lastMonthRevenue,
    monthlyRows,
    statusRows,
    topRows,
    customerIds,
    newCustomerRows,
    ordersThisMonth,
    lowStockCount,
  ] = await Promise.all([
    revenueBetween(startOfToday),
    revenueBetween(startOfYesterday, startOfToday),
    revenueBetween(new Date(0)),
    revenueBetween(startOfMonth),
    revenueBetween(startOfLastMonth, startOfMonth),

    // sales per month for the last 6 months
    Order.aggregate<{ _id: { year: number; month: number }; sales: number }>([
      ...paidItems(sixMonthsAgo),
      {
        $group: {
          _id: {
            year: { $year: { date: "$paidAt", timezone: TIMEZONE } },
            month: { $month: { date: "$paidAt", timezone: TIMEZONE } },
          },
          sales: { $sum: lineTotal },
        },
      },
    ]),

    // number of orders (containing this seller's items) per status
    Order.aggregate<{ _id: string; count: number }>([
      { $match: { "orderItems.sellerId": sellerId } },
      { $group: { _id: "$orderStatus", count: { $sum: 1 } } },
    ]),

    // top 5 products by units sold
    Order.aggregate<{
      _id: mongoose.Types.ObjectId;
      name: string;
      totalSold: number;
    }>([
      ...paidItems(new Date(0)),
      {
        $group: {
          _id: "$orderItems.productId",
          name: { $first: "$orderItems.name" },
          totalSold: { $sum: "$orderItems.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]),

    // unique buyers of this seller's products (cancelled orders don't count)
    Order.distinct("userId", {
      "orderItems.sellerId": sellerId,
      orderStatus: { $ne: "Cancelled" },
    }),

    // buyers whose first order from this seller was this month
    Order.aggregate<{ count: number }>([
      {
        $match: {
          "orderItems.sellerId": sellerId,
          orderStatus: { $ne: "Cancelled" },
        },
      },
      { $group: { _id: "$userId", firstOrderAt: { $min: "$createdAt" } } },
      { $match: { firstOrderAt: { $gte: startOfMonth } } },
      { $count: "count" },
    ]),

    Order.countDocuments({
      "orderItems.sellerId": sellerId,
      createdAt: { $gte: startOfMonth },
    }),
    Product.countDocuments({ sellerId, stock: { $lte: LOW_STOCK_THRESHOLD } }),
  ]);

  // always return the last 6 months, with 0 for months without sales
  const salesByMonth = new Map(
    monthlyRows.map((r) => [`${r._id.year}-${r._id.month}`, r.sales])
  );
  const monthlySales = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      month: date.toLocaleString("en-US", { month: "short", year: "numeric" }),
      sales: round2(
        salesByMonth.get(`${date.getFullYear()}-${date.getMonth() + 1}`) ?? 0
      ),
    };
  });

  // always return all four statuses, with 0 when there are none
  const statusCounts = new Map(statusRows.map((r) => [r._id, r.count]));
  const orderStatus = ORDER_STATUSES.map((status) => ({
    status,
    count: statusCounts.get(status) ?? 0,
  }));

  // add name, image, category and rating from the product itself
  const products = await Product.find({
    _id: { $in: topRows.map((r) => r._id) },
  })
    .select("name category rating images")
    .lean();
  const productById = new Map(products.map((p) => [p._id.toString(), p]));

  const topProducts = topRows.map((row) => {
    const product = productById.get(row._id.toString());
    return {
      productId: row._id.toString(),
      name: product?.name ?? row.name, // falls back to the name saved on the order if the product was deleted
      image: product?.images[0]?.url,
      category: product?.category ?? "Unavailable",
      totalSold: row.totalSold,
      rating: product?.rating ?? 0,
    };
  });

  res.status(200).json({
    success: true,
    stats: {
      todayRevenue,
      revenueChangePct: percentChange(todayRevenue, yesterdayRevenue),
      totalCustomers: customerIds.length,
      allTimeRevenue,
      monthlySales,
      orderStatus,
      topProducts,
      summary: {
        salesThisMonth: thisMonthRevenue,
        ordersThisMonth,
        revenueGrowthPct: percentChange(thisMonthRevenue, lastMonthRevenue),
        lowStockCount,
        newCustomersThisMonth: newCustomerRows[0]?.count ?? 0,
      },
    },
  });
};
