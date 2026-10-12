import type { Document, Model } from "mongoose";
import mongoose from "mongoose";

interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  name: string; //* Capturing snapshot details helps if product data changes later
  quantity: number;
  price: number;
}

interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  shippingInfoId: mongoose.Types.ObjectId;
  orderItems: IOrderItem[];
  price: number;
  tax: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paidAt?: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingInfoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingInfo",
      required: true,
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        sellerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: { type: String, required: true },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity cannot be less than 1"],
        },
        price: { type: Number, required: true },
      },
    ],
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    tax: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      required: true,
      default: "Processing",
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

orderSchema.index({ "orderItems.sellerId": 1 });

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
