import type { ApiError } from "@/api/apiError";
import { logout } from "@/api/authApi";
import type { AuthResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation<AuthResponse, ApiError, null>({
    mutationFn: logout,
  });
};
