import { updateProfile } from "@/api/userApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};
