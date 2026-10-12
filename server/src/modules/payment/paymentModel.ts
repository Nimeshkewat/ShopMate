import type { Document, Model } from "mongoose";
import mongoose from "mongoose";

interface IPayment extends Document {
  orderId: mongoose.Types.ObjectId;
  paymentType: "Online" | "CashOnDelivery";
  paymentStatus: "Pending" | "Paid" | "Failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
}

const paymentSchema = new mongoose.Schema<IPayment>(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["Online", "CashOnDelivery"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      required: true,
      default: "Pending",
    },
    razorpayOrderId: { type: String, unique: true, sparse: true },
    razorpayPaymentId: { type: String, unique: true, sparse: true },
    razorpaySignature: { type: String, unique: true, sparse: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;
