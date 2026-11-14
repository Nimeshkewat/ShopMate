import type { Request, Response } from "express";
import User from "./userModel.js";
import { AppError } from "../../utils/AppError.js";
import uploadToCloudinary from "../../utils/uploadToCloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import { refreshTokenExpiresAt, setAuthCookies } from "../../utils/tokens.js";
import Shop from "../shop/shopModel.js";

export const profile = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  if (!userId) {
    throw new AppError("Not Authoried", 401);
  }
  const user = await User.findById(userId).populate("shopId");
  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({ success: true, user });
};

export const updateProfile = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
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

export const removeAvatar = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const user = await User.findById(userId).select("+avatarPublicId");
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.avatarPublicId) {
    const result = await cloudinary.uploader.destroy(user.avatarPublicId);
    if (result.result !== "ok" && result.result !== "not found") {
      throw new AppError("Failed to remove profile picture", 502);
    }
  }

  user.avatar = "";
  user.avatarPublicId = "";
  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Profile picture removed", user });
};

export const updatePassword = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword) {
    throw new AppError("Old password is required", 400);
  }
  if (!newPassword || newPassword.length < 8) {
    throw new AppError(
      "New password is required and must be at least 8 characters long",
      400
    );
  }
  if (oldPassword === newPassword) {
    throw new AppError(
      "New password cannot be the same as the old password",
      400
    );
  }
  if (newPassword !== confirmPassword) {
    throw new AppError("New password and confirm password do not match", 400);
  }

  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError("Old Password is incorrect", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Password Updated successfully" });
};

export const upgradeToSeller = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const {
    shopName,
    shopDescription,
    businessPhone,
    taxId,
    bankName,
    accountNumber,
    ifscCode,
  } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  let shopImage = "";
  let shopImagePublicId = "";
  if (req.file?.buffer) {
    const result = await uploadToCloudinary(req.file?.buffer, {
      folder: "Shop_folder",
      type: "general",
    });
    shopImage = result.secure_url;
    shopImagePublicId = result.public_id;
  }

  const shop = await Shop.findOneAndUpdate(
    { userId },
    {
      $set: {
        userId,
        shopName,
        shopDescription,
        shopImage,
        shopImagePublicId,
        businessPhone,
        taxId,
        isApproved: false,
        payoutBankDetails: { bankName, accountNumber, ifscCode },
      },
    },
    { returnDocument: "after", upsert: true }
  );

  user.role = "seller";
  user.shopId = shop._id;
  await user.save();

  const refreshTokenHash = setAuthCookies(res, user._id.toString(), user.role);

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        refreshTokenHash,
        refreshTokenExpiresAt: refreshTokenExpiresAt(),
      },
    }
  );

  return res.status(200).json({
    success: true,
    message:
      "Account upgraded to Seller successfully! Awaiting admin verification.",
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      shopId: user.shopId,
    },
  });
};
