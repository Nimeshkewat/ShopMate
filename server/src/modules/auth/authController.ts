import type { Request, Response } from "express";
import User from "../user/userModel.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import {
  accessCookieOptions,
  refreshCookieOptions,
  hashRefreshToken,
  refreshTokenExpiresAt,
  verifyRefreshToken,
  setAuthCookies,
} from "../../utils/tokens.js";
import {
  sendResetPasswordLink,
  sendResetPasswordSuccess,
} from "../../utils/sendMail.js";

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

  const user = await User.findOne({ email }).select("password role");
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

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select(
    "+resetPasswordToken +resetPasswordTokenExpiresAt"
  );
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const rawResetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(rawResetToken)
    .digest("hex");

  user.resetPasswordTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${rawResetToken}`;
  try {
    await sendResetPasswordLink(user.email, resetLink);
  } catch (error) {
    console.log(`Failed to send  email: ${error}`);
  }

  res
    .status(200)
    .json({ success: true, message: "Password reset link sent to your email" });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || typeof token !== "string") {
    throw new AppError("Invalid or missing reset token", 400);
  }

  if (!newPassword || typeof newPassword !== "string") {
    throw new AppError("New password is required", 400);
  }

  const resetPasswordTokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordTokenHash,
    resetPasswordTokenExpiresAt: { $gt: Date.now() },
  }).select(
    "+resetPasswordToken +resetPasswordTokenExpiresAt +password +email +username"
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = "";
  user.resetPasswordTokenExpiresAt = undefined;
  await user.save();

  try {
    await sendResetPasswordSuccess(user.email, user.username);
  } catch (error) {
    console.log(`Failed to send email: ${error}`);
  }

  res
    .status(200)
    .json({ success: true, message: "Password Reset Successfully" });
};
