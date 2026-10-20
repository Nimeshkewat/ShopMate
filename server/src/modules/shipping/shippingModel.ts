import type { Document, Model } from "mongoose";
import mongoose from "mongoose";

interface IShipping extends Document {
  userId: mongoose.Types.ObjectId;
  fullname: string;
  state: string;
  city: string;
  country: string;
  address: string;
  pincode: string;
  phone: string;
}

const shippingSchema = new mongoose.Schema<IShipping>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 80,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 30,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 30,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 30,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 200,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
      maxLength: 15,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxLength: 10,
    },
  },
  { timestamps: true }
);

const Shipping: Model<IShipping> =
  mongoose.models.Shipping ||
  mongoose.model<IShipping>("Shipping", shippingSchema);

export default Shipping;
