import type { Document, Model } from "mongoose";
import mongoose from "mongoose";

interface SellerDetails {
  shopName?: string;
  businessPhone?: string;
  taxId?: string;
  isApproved: boolean;
  payoutBankDetails?: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
}

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  avatarPublicId: string;
  role: "user" | "seller" | "admin";
  sellerDetails: SellerDetails;
  resetPasswordToken: string;
  resetPasswordTokenExpiresAt?: Date | undefined;
  refreshTokenHash: string;
  refreshTokenExpiresAt?: Date | undefined;
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
    sellerDetails: {
      type: {
        shopName: { type: String, trim: true, sparse: true },
        businessPhone: { type: String, trim: true },
        taxId: { type: String, trim: true },
        isApproved: { type: Boolean, default: false },
        payoutBankDetails: {
          accountNumber: { type: String, select: false }, // Keep sensitive financial details private
          ifscCode: { type: String, select: false },
          bankName: { type: String },
        },
      },
      select: false,
    },
    resetPasswordToken: { type: String, select: false },
    resetPasswordTokenExpiresAt: { type: Date, select: false },
    refreshTokenHash: { type: String, select: false },
    refreshTokenExpiresAt: { type: Date, select: false },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
