import type { Request, Response } from "express";
import { AppError } from "../../../utils/AppError.js";
import Order from "../../order/orderModel.js";
import Payment from "../../payment/paymentModel.js";

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

  const orders = await Order.find({ "orderItems.sellerId": sellerId })
    .populate("shippingInfoId")
    .sort({ createdAt: -1 })
    .lean();

  //* each seller sees only their own items
  const sellerOrders = orders.map((o) => ({
    ...o,
    orderItems: o.orderItems.filter((i) => i.sellerId.equals(sellerId)),
  }));

  res.status(200).json({ success: true, sellerOrders });
};
