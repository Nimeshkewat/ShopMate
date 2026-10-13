import type { Request, Response } from "express";
import User from "../../user/userModel.js";
import Product from "../../product/productModel.js";
import Order from "../../order/orderModel.js";
import Payment from "../../payment/paymentModel.js";

export const getAdminDashboard = async (req: Request, res: Response) => {
  const [
    users,
    sellers,
    pendingSellers,
    products,
    ordersByStatus,
    revenue,
    recentOrders,
  ] = await Promise.all([
    User.countDocuments({ role: "user" }),
    User.countDocuments({ role: "seller", "sellerDetails.isApproved": true }),
    User.countDocuments({
      role: "seller",
      "sellerDetails.isApproved": false,
    }),
    Product.countDocuments(),
    Order.aggregate([{ $group: { _id: "$orderStatus", count: { $sum: 1 } } }]),
    Payment.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    Order.find()
      .select("userId totalPrice orderStatus createdAt")
      .populate("userId", "username")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  const orders = {
    Processing: 0,
    Shipped: 0,
    Delivered: 0,
    Cancelled: 0,
    ...Object.fromEntries(ordersByStatus.map((s) => [s._id, s.count])),
  };

  res.status(200).json({
    success: true,
    stats: {
      users,
      sellers,
      pendingSellers,
      products,
      totalOrders: Object.values(orders as number[]).reduce((a, b) => a + b, 0),
      orders,
      revenue: revenue[0]?.total ?? 0,
    },
    recentOrders,
  });
};
