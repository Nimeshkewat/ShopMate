import { removeAvatar } from "@/api/userApi";
import { useMutation } from "@tanstack/react-query";

export const useRemoveAvatar = () => {
  return useMutation({
    mutationFn: removeAvatar,
  });
};
