import type { Request, Response } from "express";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../../utils/paginate.js";
import { AppError } from "../../../utils/AppError.js";
import mongoose from "mongoose";
import Product from "../../product/productModel.js";
import Order from "../../order/orderModel.js";
import Payment from "../../payment/paymentModel.js";

//* Order oversight
export const getAllOrders = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const result = paginationSchema.safeParse({ page, limit });
  if (!result.success) {
    throw new AppError("Invalid pagination parameters", 400);
  }

  const { page: p, limit: l, skip } = getPaginationParams(result.data);

  const [orders, total] = await Promise.all([
    Order.find()
      .populate("userId", "username email")
      .populate("shippingInfoId")
      .sort({ createdAt: -1 })
      .limit(l)
      .skip(skip)
      .lean(),
    Order.countDocuments(),
  ]);

  const orderIds = orders.map((o) => o._id);
  const payments = await Payment.find({ orderId: { $in: orderIds } }).lean();
  const paymentMap = new Map(
    payments.map((p) => [p.orderId.toString(), p])
  );

  const ordersWithPayment = orders.map((order) => {
    const payment = paymentMap.get(order._id.toString());
    return {
      ...order,
      paymentType: payment?.paymentType,
      paymentStatus: payment?.paymentStatus,
      payment: payment || null,
    };
  });

  res.status(200).json({
    success: true,
    orders: ordersWithPayment,
    pagination: buildPaginationMeta(total, l, p),
  });
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  if (typeof orderId !== "string" || !mongoose.isValidObjectId(orderId)) {
    throw new AppError("Invalid order id", 400);
  }

  const order = await Order.findById(orderId)
    .populate("userId", "username email")
    .populate("shippingInfoId")
    .lean();
  if (!order) throw new AppError("Order not found", 404);

  const payment = await Payment.findOne({ orderId: order._id }).lean();

  res.status(200).json({
    success: true,
    order: {
      ...order,
      paymentType: payment?.paymentType,
      paymentStatus: payment?.paymentStatus,
      payment: payment || null,
    },
  });
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const { orderStatus } = req.body;

  if (!["Shipped", "Delivered", "Cancelled"].includes(orderStatus)) {
    throw new AppError("Invalid order status", 400);
  }

  if (typeof orderId !== "string" || !mongoose.isValidObjectId(orderId)) {
    throw new AppError("Invalid order id", 400);
  }

  if (orderStatus === "Cancelled") {
    const cancelled = await mongoose.connection.transaction(async (session) => {
      const o = await Order.findOneAndUpdate(
        {
          _id: orderId,
          orderStatus: { $in: ["Processing", "Shipped"] },
        },
        { orderStatus: "Cancelled" },
        { returnDocument: "after" }
      );
      if (!o) throw new AppError("Order not found", 404);

      await Product.bulkWrite(
        o.orderItems.map((i) => ({
          updateOne: {
            filter: { _id: i.productId },
            update: { $inc: { stock: i.quantity } },
          },
        })),
        { session }
      );
      return o;
    });
    return res
      .status(200)
      .json({ success: true, message: "Order cancelled", order: cancelled });
  }

  const order = await Order.findById(orderId);
  if (!order) throw new AppError("Order not found", 404);

  const nextStatus: Record<string, string> = {
    Processing: "Shipped",
    Shipped: "Delivered",
  };

  if (nextStatus[order.orderStatus] !== orderStatus) {
    throw new AppError(
      `Cannot change status from ${order.orderStatus} to ${orderStatus}`,
      400
    );
  }

  if (orderStatus === "Shipped") {
    const payment = await Payment.findOne({ orderId: order._id });
    if (!payment) throw new AppError("Payment not found", 404);
    if (payment.paymentType === "Online" && payment.paymentStatus !== "Paid")
      throw new AppError("Payment not completed", 400);
  }

  order.orderStatus = orderStatus;

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
