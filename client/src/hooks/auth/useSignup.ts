import { sighup } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: sighup,
  });
};
