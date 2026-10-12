import type { Request, Response } from "express";
import Shipping from "./shippingModel.js";
import { AppError } from "../../utils/AppError.js";

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
