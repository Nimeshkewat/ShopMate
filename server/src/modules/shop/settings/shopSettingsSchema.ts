import z from "zod";

export const updateSellerValidationSchema = z.object({
  shopName: z
    .string("Shop name is required")
    .trim()
    .min(1, "Shop name cannot be empty")
    .max(50, "Shop name must be less than 50 characters"),

  shopDescription: z
    .string()
    .trim()
    .max(300, "Shop description must be less than 300 characters")
    .optional(),

  shopImage: z.string().trim().optional(),
  shopImagePublicId: z.string().trim().optional(),
  removeShopImage: z.preprocess(
    (value) => (value === "true" ? true : value),
    z.boolean().optional()
  ),
});
