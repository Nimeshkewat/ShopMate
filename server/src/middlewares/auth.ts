import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/tokens.js";
import User from "../modules/user/userModel.js";

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
  if (decoded.type !== "access") {
    throw new AppError("Invalid token", 401);
  }

  const user = await User.findById(decoded.userId).select("_id role isBlocked");
  if (!user) {
    throw new AppError("User not found", 401);
  }

  if (user.isBlocked) {
    throw new AppError("Your account has been blocked", 403);
  }

  req.user = {
    id: user._id.toString(),
    role: user.role,
  };
  next();
};

export default isAuthenticated;
