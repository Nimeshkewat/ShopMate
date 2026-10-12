import type { Request, Response } from "express";
import Shipping from "./shippingModel.js";
import { AppError } from "../../utils/AppError.js";
import mongoose from "mongoose";

export const addShippingInfo = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { fullname, state, city, country, address, phone, pincode } = req.body;

  const addressCount = await Shipping.countDocuments();
  if (addressCount >= 3) {
    throw new AppError(
      "You can save a maximum of 3 shipping addresses. Please delete an address to add a new one.",
      400
    );
  }

  const shipping = await Shipping.create({
    userId,
    fullname,
    city,
    state,
    country,
    address,
    pincode,
    phone,
  });

  res
    .status(201)
    .json({ success: true, message: "Shipping Info Added", shipping });
};

export const fetchShippingInfo = async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  const { id: shippingId } = req.params;
  if (typeof shippingId !== "string" || !mongoose.isValidObjectId(shippingId)) {
    throw new AppError("Invalid shipping info id", 404);
  }

  const shipping = await Shipping.findOne({ userId, _id: shippingId });
  if (!shippingId) {
    throw new AppError("Shipping info not found", 404);
  }

  res.status(200).json({ success: true, shipping });
};
