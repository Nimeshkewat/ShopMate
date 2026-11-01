import { z } from "zod";

export const becomeSellerSchema = z.object({
  shopName: z
    .string()
    .trim()
    .min(1, "Shop name is required")
    .max(50, "Shop name must be 50 characters or less"),
  shopDescription: z
    .string()
    .trim()
    .max(300, "Shop description must be 300 characters or less")
    .optional(),
  shopImage: z.string().trim().optional(),
  shopImagePublicId: z.string().trim().optional(),
  businessPhone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  taxId: z
    .string()
    .trim()
    .min(1, "Tax ID is required")
    .max(20, "Tax ID must be 20 characters or less"),
  bankName: z
    .string()
    .trim()
    .min(1, "Bank name is required")
    .max(50, "Bank name must be 50 characters or less"),
  accountNumber: z
    .string()
    .trim()
    .regex(/^\d{9,18}$/, "Account number must be 9 to 18 digits"),
  ifscCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^[A-Z]{4}0[A-Z0-9]{6}$/,
      "Enter a valid IFSC code (e.g. HDFC0001234)",
    ),
});

export type BecomeSellerValues = z.infer<typeof becomeSellerSchema>;
