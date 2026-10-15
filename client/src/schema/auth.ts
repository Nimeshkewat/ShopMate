import { z } from "zod";

const email = z
  .email("Enter a valid email address")
  .trim()
  .min(1, "Email is required");

export const loginSchema = z.object({
  email,
  password: z.string().min(8, "Password is required"),
});

export const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(50, "Name must be 50 characters or less"),
  email,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be 64 characters or less"),
});

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be 64 characters or less"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordPayload = ResetPasswordValues & { token: string };
