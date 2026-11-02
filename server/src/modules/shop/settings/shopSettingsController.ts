import type { Request, Response } from "express";
import Shop from "../shopModel.js";
import { AppError } from "../../../utils/AppError.js";
import { v2 as cloudinary } from "cloudinary";
import uploadToCloudinary from "../../../utils/uploadToCloudinary.js";

export const getShop = async (req: Request, res: Response) => {
  const shop = await Shop.findOne({ userId: req.user.id });
  if (!shop) throw new AppError("Shop not found", 404);
  res.status(200).json({ success: true, shop });
};

export const updateShop = async (req: Request, res: Response) => {
  const { id: sellerId } = req.user;
  const { shopName, shopDescription, removeShopImage } = req.body;

  const shop = await Shop.findOne({ userId: sellerId, isApproved: true });
  if (!shop) throw new AppError("Shop not found", 404);

  if (req.file && req.file.buffer) {
    if (shop.shopImagePublicId) {
      try {
        await cloudinary.uploader.destroy(shop.shopImagePublicId);
      } catch (error) {
        console.log(`Failed to delete shop image: ${error}`);
      }
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "Shop_Folder",
      type: "general",
    });

    shop.shopImage = result.secure_url;
    shop.shopImagePublicId = result.public_id;
  } else if (removeShopImage) {
    if (shop.shopImagePublicId) {
      try {
        await cloudinary.uploader.destroy(shop.shopImagePublicId);
      } catch (error) {
        console.log(`Failed to delete shop image: ${error}`);
      }
    }

    shop.shopImage = "";
    shop.shopImagePublicId = "";
  }

  if (shopName !== undefined) shop.shopName = shopName;
  if (shopDescription !== undefined) shop.shopDescription = shopDescription;
  await shop.save();

  res
    .status(200)
    .json({ success: true, message: "Shop  updated successfully", shop });
};
