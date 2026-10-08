import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/tokens.js";

const isAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw new AppError("Not Authorized", 401);
  }

  let decoded;
  try {
    decoded = verifyAccessToken(accessToken);
  } catch {
    throw new AppError("Invalid token", 401);
  }

  if (decoded.type !== "refresh") {
    throw new AppError("Invalid token", 401);
  }

  req.user = {
    userId: decoded.userId,
    role: decoded.role,
  };
  next();
};

export default isAuthenticated;
