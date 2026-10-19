import { z } from "zod";

export const shippingSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(50, "Name must be 50 characters or less"),
  state: z.string().min(1, "Select a state"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(300, "Address must be 300 characters or less"),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(30, "City must be 30 characters or less"),
  pincode: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit pincode"),
  country: z.string().min(1, "Select a country"),
});

export type ShippingValues = z.infer<typeof shippingSchema>;
