import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import User from "../modules/user/userModel.js";
import Shop from "../modules/shop/shopModel.js";

const isSeller = async (req: Request, res: Response, next: NextFunction) => {
  const { id, role } = req.user;

  if (role !== "seller") {
    throw new AppError(
      "Forbidden, You are not allowed to access this resource",
      403
    );
  }

  const user = await User.findById(id).select("shopId role");
  if (!user) {
    throw new AppError("Seller not found", 404);
  }

  const shop = user.shopId
    ? await Shop.findById(user.shopId)
    : await Shop.findOne({ userId: id });

  if (!shop || !shop.isApproved) {
    throw new AppError("Your seller account is awaiting admin approval", 403);
  }

  next();
};

export default isSeller;
