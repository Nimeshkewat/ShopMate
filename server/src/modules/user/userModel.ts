import type { Document, Model } from "mongoose";
import mongoose from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  avatarPublicId: string;
  role: "user" | "seller" | "admin";
  acceptedTerms: boolean;
  termsAcceptedAt: Date | undefined;
  shopId?: mongoose.Types.ObjectId;
  resetPasswordToken: string;
  resetPasswordTokenExpiresAt?: Date | undefined;
  refreshTokenHash: string;
  refreshTokenExpiresAt?: Date | undefined;
  isBlocked: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 50,
      unique: [true, "Username is already taken"],
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: "" },
    avatarPublicId: { type: String, default: "", select: false },
    role: { type: String, enum: ["user", "seller", "admin"], default: "user" },
    acceptedTerms: {
      type: Boolean,
      required: [true, "You must accept the terms and conditions"],
      validate: {
        validator: (value) => value === true,
        message: "Terms and conditions must be accepted",
      },
      select: false,
    },
    termsAcceptedAt: {
      type: Date,
      required: true,
      default: Date.now,
      select: false,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      default: null,
    },
    resetPasswordToken: { type: String, select: false },
    resetPasswordTokenExpiresAt: { type: Date, select: false },
    refreshTokenHash: { type: String, select: false },
    refreshTokenExpiresAt: { type: Date, select: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
