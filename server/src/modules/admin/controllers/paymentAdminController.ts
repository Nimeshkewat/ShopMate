import type { Request, Response } from "express";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../../utils/paginate.js";
import { AppError } from "../../../utils/AppError.js";
import Payment from "../../payment/paymentModel.js";

export const getAllPayments = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const result = paginationSchema.safeParse({ page, limit });
  if (!result.success) {
    throw new AppError("Invalid pagination parameters", 400);
  }

  const { page: p, limit: l, skip } = getPaginationParams(result.data);

  const [payments, total] = await Promise.all([
    Payment.find()
      .select("-razorpaySignature")
      .populate("orderId", "totalPrice orderStatus userId")
      .sort({ createdAt: -1 })
      .limit(l)
      .skip(skip)
      .lean(),
    Payment.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    payments,
    pagination: buildPaginationMeta(total, l, p),
  });
};
