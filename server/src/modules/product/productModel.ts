import type { Document, Model } from "mongoose";
import mongoose from "mongoose";

interface IProductImage {
  public_id: string;
  url: string;
}

export interface IProduct extends Document {
  sellerId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  images: IProductImage[];
  stock: number;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    sellerId: {
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
    rating: { type: Number, min: 0, default: 0 },
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

productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
