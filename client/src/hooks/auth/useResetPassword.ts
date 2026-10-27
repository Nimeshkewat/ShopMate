import { resetPassword } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
