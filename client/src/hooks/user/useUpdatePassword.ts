import { updatePassword } from "@/api/userApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  });
};
