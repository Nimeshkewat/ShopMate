import crypto from "crypto";
import type { Request, Response } from "express";
import razorpay from "../../config/razorpay.js";
import { AppError } from "../../utils/AppError.js";
import Order from "../order/orderModel.js";
import Payment from "../payment/paymentModel.js";

const sign = (data: string | Buffer, secret: string) =>
  crypto.createHmac("sha256", secret).update(data).digest("hex");

const safeEqual = (a: string, b: string) =>
  a.length === b.length &&
  crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

// idempotent: safe to call from both verifyPayment and the webhook
const markPaid = async (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature?: string
) => {
  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId, paymentStatus: { $ne: "Paid" } },
    {
      paymentStatus: "Paid",
      razorpayPaymentId,
      ...(razorpaySignature && { razorpaySignature }),
    }
  );
  if (payment)
    await Order.updateOne({ _id: payment.orderId }, { paidAt: new Date() });
};

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

export const verifyPayment = async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
  const order =
    payment &&
    (await Order.findOne({ _id: payment.orderId, userId: req.user.id }));
  if (!payment || !order) throw new AppError("Payment not found", 404);

  const expected = sign(
    `${razorpay_order_id}|${razorpay_payment_id}`,
    process.env.RAZORPAY_KEY_SECRET!
  );
  if (!safeEqual(expected, razorpay_signature))
    throw new AppError("Invalid payment signature", 400);

  await markPaid(razorpay_order_id, razorpay_payment_id, razorpay_signature);
  res.status(200).json({ success: true, message: "Payment verified" });
};
