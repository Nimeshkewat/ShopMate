import type { Request, Response } from "express";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../../utils/paginate.js";
import { AppError } from "../../../utils/AppError.js";
import User from "../../user/userModel.js";
import Shop from "../../shop/shopModel.js";
import mongoose from "mongoose";

//* Seller Management
export const getPendingSellers = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const result = paginationSchema.safeParse({ page, limit });
  if (!result.success) {
    throw new AppError("Invalid pagination parameters", 400);
  }

  const { page: p, limit: l, skip } = getPaginationParams(result.data);

  const [pendingSellers, total] = await Promise.all([
    Shop.find({ isApproved: false })
      .populate("userId", "username email role avatar")
      .sort({ createdAt: -1 })
      .limit(l)
      .skip(skip)
      .lean(),
    Shop.countDocuments({ isApproved: false }),
  ]);

  res.status(200).json({
    success: true,
    pendingSellers,
    pagination: buildPaginationMeta(total, l, p),
  });
};

export const approveSeller = async (req: Request, res: Response) => {
  const sellerId =
    req.params.id || req.body.id || req.body.sellerId || req.body.shopId;
  if (
    !sellerId ||
    typeof sellerId !== "string" ||
    !mongoose.isValidObjectId(sellerId)
  ) {
    throw new AppError("Invalid seller id", 400);
  }

  // sellerId could be a Shop _id or a User _id
  let shop = await Shop.findOne({
    _id: sellerId,
    isApproved: false,
  });

  if (!shop) {
    shop = await Shop.findOne({
      userId: sellerId,
      isApproved: false,
    });
  }

  if (!shop) {
    throw new AppError("Pending seller not found", 404);
  }

  shop.isApproved = true;
  await shop.save();

  await User.updateOne(
    { _id: shop.userId },
    { $set: { role: "seller", shopId: shop._id } }
  );

  res.status(200).json({ success: true, message: "Seller approved", shop });
};

export const rejectSeller = async (req: Request, res: Response) => {
  const sellerId =
    req.params.id || req.body.id || req.body.sellerId || req.body.shopId;
  if (
    !sellerId ||
    typeof sellerId !== "string" ||
    !mongoose.isValidObjectId(sellerId)
  ) {
    throw new AppError("Invalid seller id", 400);
  }

  // sellerId could be a Shop _id or a User _id
  let shop = await Shop.findOne({
    _id: sellerId,
    isApproved: false,
  });

  if (!shop) {
    shop = await Shop.findOne({
      userId: sellerId,
      isApproved: false,
    });
  }

  if (!shop) {
    throw new AppError("Pending seller not found", 404);
  }

  const userId = shop.userId;
  await Shop.deleteOne({ _id: shop._id });

  await User.updateOne(
    { _id: userId },
    {
      $set: { role: "user" },
      $unset: { shopId: 1 },
    }
  );

  res.status(200).json({ success: true, message: "Seller Rejected" });
};
