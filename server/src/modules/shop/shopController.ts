import type { Request, Response } from "express";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../utils/paginate.js";
import { AppError } from "../../utils/AppError.js";
import Shop from "./shopModel.js";
import mongoose from "mongoose";
import Product from "../product/productModel.js";

export const getAllShops = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const result = paginationSchema.safeParse({ page, limit });
  if (!result.success) {
    throw new AppError("Invalid pagination parameters", 400);
  }

  const { page: p, limit: l, skip } = getPaginationParams(result.data);
  const [shops, total] = await Promise.all([
    Shop.find({ isApproved: true }).skip(skip).limit(l).lean(),
    Shop.countDocuments({ isApproved: true }),
  ]);

  res.status(200).json({
    success: true,
    shops,
    pagination: buildPaginationMeta(total, l, p),
  });
};

export const getShopProducts = async (req: Request, res: Response) => {
  const { id: shopId } = req.params;
  const { page, limit } = req.query;
  if (typeof shopId !== "string" || !mongoose.isValidObjectId(shopId)) {
    throw new AppError("Invalid shop id", 400);
  }

  const result = paginationSchema.safeParse({ page, limit });
  if (!result.success) throw new AppError("Invalid pagination parameters", 400);
  const { page: p, limit: l, skip } = getPaginationParams(result.data);

  const shop = await Shop.findOne({ _id: shopId, isApproved: true });
  if (!shop) throw new AppError("Shop not found", 404);

  const [products, total] = await Promise.all([
    Product.find({ sellerId: shopId }).skip(skip).limit(l).lean(),
    Product.countDocuments({ sellerId: shopId }),
  ]);

  res.status(200).json({
    success: true,
    products,
    pagination: buildPaginationMeta(total, l, p),
  });
};
