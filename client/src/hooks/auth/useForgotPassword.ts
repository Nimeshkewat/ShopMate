import { forgotPassword } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};
