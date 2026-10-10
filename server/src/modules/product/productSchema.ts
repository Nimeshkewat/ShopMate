import { z } from "zod";

export const productValidationSchema = z.object({
  name: z
    .string('Product name is required"')
    .trim()
    .min(1, "Product name cannot be empty")
    .max(50, "Product name must be less than 50 characters"),

  description: z
    .string("Product description is required")
    .trim()
    .min(1, "Product description cannot be empty")
    .max(200, "Product description must be less than 200 characters"),

  price: z.coerce
    .number("Product price is required")
    .min(0, "Price cannot be negative"),

  category: z
    .string("Product category is required")
    .trim()
    .min(1, "Product category cannot be empty")
    .max(50, "Product category must be less than 50 characters"),

  stock: z.coerce
    .number("Stock is required")
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .default(0),
});
