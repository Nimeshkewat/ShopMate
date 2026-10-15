import type { ApiError } from "@/api/apiError";
import { resetPassword } from "@/api/authApi";
import type { ResetPasswordPayload } from "@/schema/auth";
import type { AuthResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
  return useMutation<AuthResponse, ApiError, ResetPasswordPayload>({
    mutationFn: resetPassword,
  });
};
