import type { Request, Response } from "express";
import { AppError } from "../../../utils/AppError.js";
import Order from "../../order/orderModel.js";
import Payment from "../../payment/paymentModel.js";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../../utils/paginate.js";

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id: sellerId } = req.user;
  const { orderStatus } = req.body;
  const { id: orderId } = req.params;

  if (typeof orderId !== "string") {
    throw new AppError("Invalid order id", 400);
  }

  if (
    !["Processing", "Shipped", "Delivered", "Cancelled"].includes(orderStatus)
  ) {
    throw new AppError("Invalid Order status", 400);
  }

  const order = await Order.findOneAndUpdate(
    { _id: orderId, "orderItems.sellerId": sellerId },
    { orderStatus }
  );
  if (!order) throw new AppError("Order not found", 404);

  if (orderStatus === "Delivered") {
    const { modifiedCount } = await Payment.updateOne(
      { orderId: order._id, paymentType: "CashOnDelivery" },
      { paymentStatus: "Paid" }
    );
    if (modifiedCount) order.paidAt = new Date();
  }

  await order.save();
  res
    .status(200)
    .json({ success: true, message: "Order status updated", order });
};

export const fetchSellerOrders = async (req: Request, res: Response) => {
  const { id: sellerId } = req.user;
  const { page, limit, status } = req.query;
  const result = paginationSchema.safeParse({ page, limit });
  if (!result.success) {
    throw new AppError("Invalid pagination parameters", 400);
  }
  if (
    status !== undefined &&
    (typeof status !== "string" ||
      !["Processing", "Shipped", "Delivered", "Cancelled"].includes(status))
  ) {
    throw new AppError("Invalid order status filter", 400);
  }

  const { page: p, limit: l, skip } = getPaginationParams(result.data);
  const filter: Record<string, unknown> = {
    "orderItems.sellerId": sellerId,
  };
  if (status) filter.orderStatus = status;

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .populate("shippingInfoId")
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(l)
      .lean(),
    Order.countDocuments(filter),
  ]);

  //* each seller sees only their own items
  const sellerOrders = orders.map((o) => ({
    ...o,
    orderItems: o.orderItems.filter((i) => i.sellerId.equals(sellerId)),
  }));

  res.status(200).json({
    success: true,
    sellerOrders,
    pagination: buildPaginationMeta(total, l, p),
  });
};
