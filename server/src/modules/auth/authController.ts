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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("password");
  if (!user) {
    throw new AppError("Incorrect username or password", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Incorrect username or password", 400);
  }

  const accessToken = createAccessToken(user._id.toString(), user.role);
  const refreshToken = createRefreshToken(user._id.toString(), user.role);

  res
    .cookie("accessToken", accessToken, accessCookieOptions())
    .cookie("refreshToken", refreshToken, refreshCookieOptions());

  const refreshTokenHash = hashRefreshToken(refreshToken);

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        refreshTokenHash,
        refreshTokenExpiresAt: refreshTokenExpiresAt(),
      },
    }
  );

  res.status(201).json({ success: true, message: "Logged In Successfully" });
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    const refreshTokenHash = hashRefreshToken(refreshToken);
    await User.updateOne(
      { refreshTokenHash },
      { $unset: { refreshTokenHash: 1, refreshTokenExpiresAt: 1 } }
    );
  }

  res
    .clearCookie("accessToken", accessCookieOptions())
    .clearCookie("refreshToken", refreshCookieOptions())
    .status(200)
    .json({ success: true, message: "Logged Out Successfully" });
};
