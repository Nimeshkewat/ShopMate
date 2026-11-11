import type { Request, Response } from "express";
import mongoose from "mongoose";
import { AppError } from "../../utils/AppError.js";
import Product from "../product/productModel.js";
import Wishlist from "./wishlistModel.js";

export const addToWishlist = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const { id: userId } = req.user;

  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invalid product id", 400);
  }

  const product = await Product.findById(productId).select("_id");
  if (!product) throw new AppError("Product not found", 404);

  const wishlist = await Wishlist.findOneAndUpdate(
    { userId },
    { $addToSet: { products: product._id } },
    { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
  ).populate("products", "name images price stock");

  res.status(200).json({ success: true, wishlist });
};

export const fetchWishlist = async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  const wishlist = await Wishlist.findOne({ userId })
    .populate("products", "name images price stock")
    .lean();

  res.status(200).json({
    success: true,
    wishlist: wishlist ?? { products: [] },
  });
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const { id: userId } = req.user;

  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invalid product id", 400);
  }

  const wishlist = await Wishlist.findOneAndUpdate(
    { userId },
    { $pull: { products: new mongoose.Types.ObjectId(productId) } },
    { returnDocument: "after" }
  ).populate("products", "name images price stock");

  res.status(200).json({
    success: true,
    message: "Product removed from wishlist",
    wishlist: wishlist ?? { products: [] },
  });
};

export const clearWishlist = async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  await Wishlist.findOneAndUpdate({ userId }, { $set: { products: [] } });
  res.status(200).json({ success: true, message: "Wishlist cleared" });
};
