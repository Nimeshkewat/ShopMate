import type { Request, Response } from "express";
import User from "./userModel.js";
import { AppError } from "../../utils/AppError.js";

export const profile = async (req: Request, res: Response) => {
  const { userId } = req.user;
  if (!userId) {
    throw new AppError("Not Authoried", 401);
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({ success: true, user });
};
