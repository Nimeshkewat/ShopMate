import type { Request, Response } from "express";
import User from "./userModel.js";
import { AppError } from "../../utils/AppError.js";
import uploadToCloudinary from "../../utils/uploadToCloudinary.js";
import { v2 as cloudinary } from "cloudinary";

export const profile = async (req: Request, res: Response) => {
  const { userId } = req.user;
  if (!userId) {
    throw new AppError("Not Authoried", 401);
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({ success: true, user });
};

export const updateProfile = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { username } = req.body;

  const user = await User.findById(userId).select("+avatarPublicId");
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (req.file && req.file?.buffer) {
    if (user.avatarPublicId) {
      try {
        await cloudinary.uploader.destroy(user.avatarPublicId);
      } catch (error) {
        console.log(`Failed to delete user avatar: ${error}`);
      }
    }

    const result = await uploadToCloudinary(req.file?.buffer, {
      folder: "Avatars_folder",
      type: "avatar",
    });
    user.avatar = result.secure_url;
    user.avatarPublicId = result.public_id;
  }

  user.username = username || user.username;
  await user.save();

  res.status(200).json({ success: true, message: "Profile Updated", user });
};
