import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().nonempty("username is required"),
  email: z
    .email("Invalid email address")
    .nonempty("email is required")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "Password must be at least 8 characters"),
});
