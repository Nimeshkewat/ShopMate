import type { Request, Response } from "express";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../../utils/paginate.js";
import { AppError } from "../../../utils/AppError.js";
import User from "../../user/userModel.js";
import mongoose from "mongoose";

//* User Management
export const getAllUsers = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const result = paginationSchema.safeParse({ page, limit });
  if (!result.success) {
    throw new AppError("Invalid pagination parameters", 400);
  }

  const { page: p, limit: l, skip } = getPaginationParams(result.data);

  const [users, total] = await Promise.all([
    User.find({}).sort({ createdAt: -1 }).limit(l).skip(skip).lean(),
    User.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    users,
    pagination: buildPaginationMeta(total, l, p),
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  if (typeof userId !== "string" || !mongoose.isValidObjectId(userId)) {
    throw new AppError("Invalid user id", 400);
  }

  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({ success: true, user });
};

export const blockUser = async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  if (typeof userId !== "string" || !mongoose.isValidObjectId(userId)) {
    throw new AppError("Invalid user id", 400);
  }

  const user = await User.findOneAndUpdate(
    { userId, role: { $ne: "admin" } },
    {
      $set: { isBlocked: true },
      $unset: { refreshTokenHash: 1, refreshTokenExpiresAt: 1 },
    },
    { returnDocument: "after" }
  );
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({ success: true, message: "User Blocked", user });
};

export const unBlockUser = async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  if (typeof userId !== "string" || !mongoose.isValidObjectId(userId)) {
    throw new AppError("Invalid user id", 400);
  }

  const user = await User.findOneAndUpdate(
    { userId, role: { $ne: "admin" } },
    { isBlocked: false },
    { returnDocument: "after" }
  );
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({ success: true, message: "User Unblocked", user });
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  const { id: adminId } = req.user;
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    throw new AppError("Invalid role", 404);
  }
  if (userId === adminId)
    throw new AppError("You cannot change your own role", 400);

  if (typeof userId !== "string" || !mongoose.isValidObjectId(userId)) {
    throw new AppError("Invalid user id", 400);
  }

  const user = await User.findByIdAndUpdate(
    { userId },
    { role },
    { returnDocument: "after" }
  );
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({ success: true, message: "User role updated", user });
};
