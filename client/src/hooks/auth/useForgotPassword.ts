import type { ApiError } from "@/api/apiError";
import { forgotPassword } from "@/api/authApi";
import type { ForgotPasswordValues } from "@/schema/auth";
import type { AuthResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useForgotPassword = () => {
  return useMutation<AuthResponse, ApiError, ForgotPasswordValues>({
    mutationFn: forgotPassword,
  });
};
