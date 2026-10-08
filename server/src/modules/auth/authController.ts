import type { Request, Response } from "express";
import User from "../user/userModel.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcryptjs";
import {
  accessCookieOptions,
  createAccessToken,
  createRefreshToken,
  refreshCookieOptions,
  hashRefreshToken,
  refreshTokenExpiresAt,
} from "../../utils/tokens.js";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new AppError("user already exist", 404);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res
    .status(201)
    .json({ success: true, message: "Account Created Successfully" });
};
