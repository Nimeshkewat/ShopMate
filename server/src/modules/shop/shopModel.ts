import type { Document, Model } from "mongoose";
import mongoose from "mongoose";

interface IShopPayoutBankDetails {
  accountNumber?: string;
  ifscCode?: string;
  bankName?: string;
}

interface IShop extends Document {
  userId: mongoose.Types.ObjectId;
  shopName: string;
  shopDescription: string;
  shopImage?: string;
  shopImagePublicId?: string;
  businessPhone: string;
  taxId: string;
  isApproved: boolean;
  payoutBankDetails?: IShopPayoutBankDetails;
  createdAt: Date;
  updatedAt: Date;
}

const shopSchema = new mongoose.Schema<IShop>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      unique: [true, "shop name is already taken"],
    },
    shopDescription: {
      type: String,
      trim: true,
      maxLength: [300, "Must be less than 300 characters"],
    },
    shopImage: {
      type: String,
      default: "",
    },
    shopImagePublicId: {
      type: String,
      default: "",
    },
    businessPhone: {
      type: String,
      required: true,
      trim: true,
    },
    taxId: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    payoutBankDetails: {
      accountNumber: { type: String, select: false },
      ifscCode: { type: String, select: false },
      bankName: { type: String },
    },
  },
  { timestamps: true }
);

const Shop: Model<IShop> =
  mongoose.models.Shop || mongoose.model<IShop>("Shop", shopSchema);

export default Shop;
