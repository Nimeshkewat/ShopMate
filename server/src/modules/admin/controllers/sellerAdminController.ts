import type { Request, Response } from "express";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../../utils/paginate.js";
import { AppError } from "../../../utils/AppError.js";
import User from "../../user/userModel.js";
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
    User.find({ role: "seller", "sellerDetails.isApproved": false })
      .select("sellerDetails")
      .sort({ createdAt: -1 })
      .limit(l)
      .skip(skip)
      .lean(),
    User.countDocuments({ role: "seller", "sellerDetails.isApproved": false }),
  ]);

  res.status(200).json({
    success: true,
    pendingSellers,
    pagination: buildPaginationMeta(total, l, p),
  });
};

export const approveSeller = async (req: Request, res: Response) => {
  const { id: sellerId } = req.params;
  if (typeof sellerId !== "string" || !mongoose.isValidObjectId(sellerId)) {
    throw new AppError("Invalid seller id", 400);
  }

  const { matchedCount } = await User.updateOne(
    {
      _id: sellerId,
      role: "seller",
      "sellerDetails.isApproved": false,
    },
    { $set: { "sellerDetails.isApproved": true } }
  );
  if (!matchedCount) throw new AppError("Pending seller not found", 404);

  res.status(200).json({ success: true, message: "Seller approved" });
};

export const rejectSeller = async (req: Request, res: Response) => {
  const { id: sellerId } = req.params;
  if (typeof sellerId !== "string" || !mongoose.isValidObjectId(sellerId)) {
    throw new AppError("Invalid seller id", 400);
  }

  const { modifiedCount } = await User.updateOne(
    { _id: sellerId, role: "seller", "sellerDetails.isApproved": false },
    {
      $set: { role: "user" },
      $unset: { sellerDetails: 1 },
    }
  );

  if (!modifiedCount) {
    throw new AppError("Pending seller not found", 404);
  }
  res.status(200).json({ success: true, message: "Seller Rejected" });
};
