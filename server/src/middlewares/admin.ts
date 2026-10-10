import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.user;
  if (role !== "Admin") {
    throw new AppError(
      "Forbidden, You are not allowed to access this resource",
      403
    );
  }

  next();
};

export default isAdmin;
