import type { CookieOptions } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import crypto from "node:crypto";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_DAYS = 7;

export const createAccessToken = (userId: string, role: string) => {
  return jwt.sign(
    { userId, role, type: "access" },
    process.env.ACCESS_SECRET!,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
};

export const createRefreshToken = (userId: string, role: string) => {
  return jwt.sign(
    { userId, role, type: "refresh", nonce: crypto.randomUUID() },
    process.env.REFRESH_SECRET!,
    { expiresIn: `${REFRESH_TOKEN_DAYS}d` }
  );
};

export const hashRefreshToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const refreshTokenExpiresAt = () => {
  return new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_SECRET!) as JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.REFRESH_SECRET!) as JwtPayload;
};

export const accessCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 15 * 60 * 1000,
  path: "/",
});

export const refreshCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000,
  path: "/api/v1/auth/refresh",
});

export const setAuthCookies = (res: Response, userId: string, role: string) => {
  const accessToken = createAccessToken(userId, role);
  const refreshToken = createRefreshToken(userId, role);

  res
    .cookie("accessToken", accessToken, accessCookieOptions())
    .cookie("refreshToken", refreshToken, refreshCookieOptions());

  return hashRefreshToken(refreshToken);
};
