import { z } from "zod";

export const sellerValidationSchema = z.object({
  shopName: z
    .string("Shop name is required")
    .trim()
    .min(1, "Shop name cannot be empty")
    .max(50, "Shop name must be less than 50 characters"),

  shopImage: z.string().trim().optional(),
  shopImagePublicId: z.string().trim().optional(),

  businessPhone: z
    .string("Business phone number is required")
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

  taxId: z
    .string("Tax id is required")
    .trim()
    .min(1, "Tax id cannot be empty")
    .max(20, "Tax id must be at most 20 characters"),

  bankName: z
    .string("Bank name is required")
    .trim()
    .min(1, "Bank name cannot be empty")
    .max(50, "Bank name must be less than 50 characters"),

  accountNumber: z
    .string("Account number is required")
    .trim()
    .regex(/^\d{9,18}$/, "Invalid account number"),

  ifscCode: z
    .string("IFSC code is required")
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
});
