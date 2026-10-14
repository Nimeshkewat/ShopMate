import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be 64 characters or less"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((v) => v.newPassword !== v.oldPassword, {
    message: "New password must be different from the current one",
    path: ["newPassword"],
  });

export type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;
