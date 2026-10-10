import type { Document, Model } from "mongoose";
import mongoose from "mongoose";

interface IProductImage {
  public_id: string;
  url: string;
}

interface IProduct extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  ratings: number;
  images: IProductImage[];
  stock: number;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 50,
    },
    description: { type: String, required: true, trim: true, maxLength: 200 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, maxLength: 50 },
    ratings: { type: Number, min: 0, default: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
