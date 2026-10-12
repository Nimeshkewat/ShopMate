import type { Request, Response } from "express";
import mongoose from "mongoose";
import { AppError } from "../../utils/AppError.js";
import Shipping from "../shipping/shippingModel.js";
import Cart from "../cart/cartModel.js";
import Product from "../product/productModel.js";
import Order from "./orderModel.js";
import Payment from "../payment/paymentModel.js";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../utils/paginate.js";

export const createOrder = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { shippingInfoId, paymentType } = req.body;

  if (
    !mongoose.isValidObjectId(shippingInfoId) ||
    !["Online", "CashOnDelivery"].includes(paymentType)
  ) {
    throw new AppError("Invalid shipping id or payment type", 400);
  }

  const [shipping, cart] = await Promise.all([
    Shipping.findOne({ userId }),
    Cart.findOne({ userId }),
  ]);

  if (!shipping) throw new AppError("Shipping info not found", 404);
  if (!cart) throw new AppError("Cart not found", 404);

  const products = await Product.find({
    _id: { $in: cart.items.map((i) => i.productId) },
  });
  const productMap = new Map(products.map((p) => [p._id.toString(), p]));

  const orderItems = cart.items.map((i) => {
    const p = productMap.get(i.productId.toString());
    if (!p) throw new AppError(`Product is no longer available`, 400);
    return {
      productId: p._id,
      sellerId: p.sellerId,
      name: p.name,
      quantity: i.quantity,
      price: p.price,
    };
  });

  const price = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = Math.round(price * 0.18);
  const shippingPrice = price > 500 ? 0 : 50;
  const totalPrice = price + tax + shippingPrice;

  const order = await mongoose.connection.transaction(async (session) => {
    for (const i of orderItems) {
      const { modifiedCount } = await Product.updateOne(
        { _id: i.productId, stock: { $gte: i.quantity } },
        { $inc: { stock: -i.quantity } },
        { session }
      );
      if (!modifiedCount)
        throw new AppError(`Insufficient stock for ${i.name}`, 400);
    }

    const [created] = await Order.create(
      [
        {
          userId,
          shippingInfoId,
          orderItems,
          price,
          tax,
          shippingPrice,
          totalPrice,
        },
      ],
      { session }
    );
    if (!created) throw new AppError("Failed to create an order", 400);

    await Payment.create(
      [{ orderId: created._id, paymentType, amount: totalPrice }],
      { session }
    );
    await Cart.deleteOne({ _id: cart._id }, { session });
    return created;
  });

  res.status(201).json({ success: true, message: "Order placed", order });
};

export const fetchOrders = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { page, limit } = req.query;

  const result = paginationSchema.safeParse({ page, limit });
  if (!result.success) {
    throw new AppError("Invalid pagination parameters", 400);
  }

  const { page: p, limit: l, skip } = getPaginationParams(result.data);
  const orders = await Order.find({ userId })
    .limit(l)
    .skip(skip)
    .sort({ createdAt: -1 });

  const total = await Order.countDocuments();
  const pagination = buildPaginationMeta(total, l, p);

  res.status(200).json({ success: true, orders, pagination });
};

export const fetchOrderDetail = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { id: orderId } = req.params;

  if (typeof orderId !== "string") {
    throw new AppError("Invalid order id", 400);
  }

  const order = await Order.findOne({ userId, _id: orderId });
  if (!order) {
    throw new AppError("Order not found", 404);
  }
  res.status(200).json({ success: true, order });
};

export const cancelorder = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { id: orderId } = req.params;

  if (typeof orderId !== "string") {
    throw new AppError("Invalid order id", 400);
  }

  const order = await mongoose.connection.transaction(async (session) => {
    const o = await Order.findOneAndUpdate(
      {
        _id: orderId,
        userId,
        orderStatus: "Processing",
      },
      { orderStatus: "Cancelled" },
      { returnDocument: "after", session }
    );
    if (!o) {
      throw new AppError("Order not found or can no longer be cancelled", 400);
    }

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

  res.status(200).json({ success: true, message: "Order cancelled", order });
};

//* Seller
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
