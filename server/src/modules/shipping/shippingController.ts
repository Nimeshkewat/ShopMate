import type { Request, Response } from "express";
import Shipping from "./shippingModel.js";
import { AppError } from "../../utils/AppError.js";
import mongoose from "mongoose";

export const addShippingInfo = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { fullname, state, city, country, address, phone, pincode } = req.body;

  const addressCount = await Shipping.countDocuments({ userId });
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

export const fetchAllShippingInfo = async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  const shipping = await Shipping.find({ userId });
  if (!shipping.length) {
    res.status(200).json({ success: true, shipping: [] });
  }

  res.status(200).json({ success: true, shipping });
};

export const updateShippingInfo = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { fullname, state, city, country, address, phone, pincode } = req.body;

  const { id: shippingId } = req.params;
  if (typeof shippingId !== "string" || !mongoose.isValidObjectId(shippingId)) {
    throw new AppError("Invalid shipping info id", 404);
  }

  const shipping = await Shipping.findOne({ userId, _id: shippingId });
  if (!shipping) {
    throw new AppError("Shipping info not found", 404);
  }

  shipping.fullname = fullname || shipping.fullname;
  shipping.state = state || shipping.state;
  shipping.country = country || shipping.country;
  shipping.city = city || shipping.city;
  shipping.address = address || shipping.address;
  shipping.phone = phone || shipping.phone;
  shipping.pincode = pincode || shipping.pincode;
  await shipping.save();

  res
    .status(200)
    .json({ success: true, message: "Shipping info updated", shipping });
};

export const deleteShippingInfo = async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  const { id: shippingId } = req.params;
  if (typeof shippingId !== "string" || !mongoose.isValidObjectId(shippingId)) {
    throw new AppError("Invalid shipping info id", 404);
  }

  const shipping = await Shipping.findOneAndDelete({ userId, _id: shippingId });
  if (!shipping) {
    throw new AppError("Shipping info not found", 404);
  }

  res.status(200).json({ success: true, message: "Shipping info removed" });
};
