import { type ApiError } from "@/api/apiError";
import { sighup } from "@/api/authApi";
import type { SignupValues } from "@/schema/auth";
import type { AuthResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation<AuthResponse, ApiError, SignupValues>({
    mutationFn: sighup,
  });
};
