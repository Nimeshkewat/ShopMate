import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import User from "../modules/user/userModel.js";

const isSeller = async (req: Request, res: Response, next: NextFunction) => {
  const { id, role } = req.user;

  const seller = await User.findById(id).select("sellerDetails");
  if (!seller) {
    throw new AppError("Seller not found", 404);
  }

  if (!seller.sellerDetails.isApproved) {
    throw new AppError("Your seller account is awaiting adming approval", 403);
  }

  if (role !== "seller") {
    throw new AppError(
      "Forbidden, You are not allowed to access this resource",
      403
    );
  }

  next();
};

export default isSeller;
