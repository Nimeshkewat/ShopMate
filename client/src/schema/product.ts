import { z } from "zod";
import { CATEGORIES } from "@/utils/constants";

const categoryNames = CATEGORIES.map((c) => c.name);

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(50, "Product name must be 50 characters or less"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(200, "Description must be 200 characters or less"),

  price: z.coerce
    .number()
    .min(0, "Price cannot be negative"),

  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .refine((val) => categoryNames.includes(val), "Select a valid category"),

  stock: z.coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
});

export type ProductValues = z.infer<typeof productSchema>;
