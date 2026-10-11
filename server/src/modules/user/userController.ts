import type { Request, Response } from "express";
import User from "./userModel.js";
import { AppError } from "../../utils/AppError.js";
import uploadToCloudinary from "../../utils/uploadToCloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import { refreshTokenExpiresAt, setAuthCookies } from "../../utils/tokens.js";

export const profile = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
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
  const { shopName, businessPhone, taxId, bankName, accountNumber, ifscCode } =
    req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        role: "seller",
        sellerDetails: {
          shopName,
          businessPhone,
          taxId,
          isApproved: false,
          payoutBankDetails: { bankName, accountNumber, ifscCode },
        },
      },
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  const refreshTokenHash = setAuthCookies(
    res,
    updatedUser._id.toString(),
    updatedUser.role
  );

  await User.updateOne(
    { _id: updatedUser._id },
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
      id: updatedUser._id.toString(),
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    },
  });
};
