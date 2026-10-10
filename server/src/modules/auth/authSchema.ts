import { z } from "zod";

export const registerValidationSchema = z.object({
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

export const loginSchema = z.object({
  email: z.email().nonempty("email is required"),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address").nonempty("email is required"),
});

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .nonempty("password is required")
    .min(8, "Password must be at least 8 characters"),
});
