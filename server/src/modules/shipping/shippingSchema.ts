import { z } from "zod";

export const shippingValidationSchema = z.object({
  fullname: z
    .string("Fullname field is required")
    .trim()
    .min(1, "Fullname field cannot be empty")
    .max(50, "Fullname field must be less than 50 characters"),
  state: z
    .string("State field is required")
    .trim()
    .min(1, "State field cannot be empty")
    .max(30, "State field must be less than 30 characters"),
  city: z
    .string("City field is required")
    .trim()
    .min(1, "City field cannot be empty")
    .max(30, "City field must be less than 30 characters"),
  country: z
    .string("Country field is required")
    .trim()
    .min(1, "Country field cannot be empty")
    .max(30, "Country field must be less than 30 characters"),
  address: z
    .string("Address field is required")
    .trim()
    .min(1, "Address field cannot be empty")
    .max(300, "Address field must be less than 300 characters"),
  phone: z
    .string("Phone number is required")
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid  phone number"),
  pincode: z
    .string("Pincode is required")
    .trim()
    .regex(/^[1-9][0-9]{5}$/, "Invalid pincode"),
});
