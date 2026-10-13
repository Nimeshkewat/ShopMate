import type { Request, Response } from "express";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../../utils/paginate.js";
import { AppError } from "../../../utils/AppError.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import Product from "../../product/productModel.js";

//* Product Moderation
export const getAllProduct = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const result = paginationSchema.safeParse({ page, limit });
  if (!result.success) {
    throw new AppError("Invalid pagination parameteers", 400);
  }

  const { page: p, limit: l, skip } = getPaginationParams(result.data);
  const [products, total] = await Promise.all([
    Product.find({}).sort({ createdAt: -1 }).limit(l).skip(skip).lean(),
    Product.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    products,
    pagination: buildPaginationMeta(total, l, p),
  });
};

//* (remove violating listings)
export const deleteProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invalid user id", 400);
  }

  const product = await Product.findByIdAndDelete({ _id: productId });
  if (!product) throw new AppError("Product not found", 404);

  await Promise.allSettled(
    product.images.map((image) => cloudinary.uploader.destroy(image.public_id))
  );

  res.status(200).json({ success: true, message: "Product Deleted" });
};
