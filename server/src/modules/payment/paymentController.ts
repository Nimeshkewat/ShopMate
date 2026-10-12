import crypto from "crypto";
import type { Request, Response } from "express";
import razorpay from "../../config/razorpay.js";
import { AppError } from "../../utils/AppError.js";
import Order from "../order/orderModel.js";
import Payment from "../payment/paymentModel.js";

export const createRazorpayOrder = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { orderId } = req.body;
  const order = await Order.findOne({
    _id: orderId,
    userId,
    orderStatus: "Processing",
  });
  if (!order) throw new AppError("Order not found", 404);

  const payment = await Payment.findOne({
    orderId: order._id,
    paymentType: "Online",
    paymentStatus: "Pending",
  });
  if (!payment)
    throw new AppError("No pending online payment for this order", 400);

  if (!payment.razorpayOrderId) {
    const rzpOrder = await razorpay.orders.create({
      amount: Math.round(order.totalPrice * 100),
      currency: "INR",
      receipt: order._id.toString(),
    });
    payment.razorpayOrderId = rzpOrder.id;
    await payment.save();
  }

  res.status(200).json({
    success: true,
    razorpayOrderId: payment.razorpayOrderId,
    amount: Math.round(order.totalPrice * 100),
    currency: "INR",
    keyId: process.env.RAZORPAY_KEY_ID,
  });
};
