import { type ApiError } from "@/api/apiError";
import { login } from "@/api/authApi";
import type { LoginValues } from "@/schema/auth";
import type { AuthResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation<AuthResponse, ApiError, LoginValues>({
    mutationFn: login,
  });
};
