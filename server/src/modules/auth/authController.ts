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
  verifyRefreshToken,
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

const setAuthCookies = (res: Response, userId: string, role: string) => {
  const accessToken = createAccessToken(userId, role);
  const refreshToken = createRefreshToken(userId, role);

  res
    .cookie("accessToken", accessToken, accessCookieOptions())
    .cookie("refreshToken", refreshToken, refreshCookieOptions());

  return hashRefreshToken(refreshToken);
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
  const refreshTokenHash = setAuthCookies(res, user._id.toString(), user.role);

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

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new AppError("Refresh token is required", 401);

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError("Invalid refresh token", 401);
  }

  if (decoded.type !== "refresh" || typeof decoded.id !== "string") {
    throw new AppError("Invalid refresh token", 401);
  }

  const refreshTokenHash = hashRefreshToken(refreshToken);
  const user = await User.findOne({
    _id: decoded.id,
    refreshTokenHash,
    refreshTokenExpiresAt: { $gt: new Date() },
  }).select("+refreshTokenHash +refreshTokenExpiresAt");

  if (!user) throw new AppError("Invalid refresh token", 401);

  const nextRefreshTokenHash = setAuthCookies(
    res,
    user._id.toString(),
    user.role
  );
  user.refreshTokenHash = nextRefreshTokenHash;
  user.refreshTokenExpiresAt = refreshTokenExpiresAt();
  await user.save();

  res.status(200).json({ success: true, message: "Token refreshed" });
};
