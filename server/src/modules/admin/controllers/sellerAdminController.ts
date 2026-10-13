import type { Request, Response } from "express";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../../utils/paginate.js";
import { AppError } from "../../../utils/AppError.js";
import User from "../../user/userModel.js";

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
