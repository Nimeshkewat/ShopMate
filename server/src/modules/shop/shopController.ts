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
    Shop.find({ isApproved: true })
      .sort({ createdAt: -1, _id: -1 })
      .select("_id shopName shopDescription shopImage userId createdAt")
      .skip(skip)
      .limit(l)
      .lean(),
    Shop.countDocuments({ isApproved: true }),
  ]);

  const counts = await Product.aggregate<{
    _id: mongoose.Types.ObjectId;
    count: number;
  }>([
    { $match: { sellerId: { $in: shops.map((s) => s.userId) } } },
    { $group: { _id: "$sellerId", count: { $sum: 1 } } },
  ]);
  const countBySeller = new Map(counts.map((c) => [c._id.toString(), c.count]));

  res.status(200).json({
    success: true,
    shops: shops.map(({ userId, ...shop }) => ({
      ...shop,
      productCount: countBySeller.get(userId.toString() ?? 0),
    })),
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

  const shop = await Shop.findOne({ _id: shopId, isApproved: true })
    .select("shopName shopDescription shopImage userId")
    .lean();
  if (!shop) throw new AppError("Shop not found", 404);

  const [products, total] = await Promise.all([
    Product.find({ sellerId: shop.userId })
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(l)
      .lean(),
    Product.countDocuments({ sellerId: shopId }),
  ]);

  res.status(200).json({
    success: true,
    shop: {
      _id: shop._id,
      shopName: shop.shopName,
      shopDescription: shop.shopDescription,
      shopImage: shop.shopImage,
    },
    products,
    pagination: buildPaginationMeta(total, l, p),
  });
};
