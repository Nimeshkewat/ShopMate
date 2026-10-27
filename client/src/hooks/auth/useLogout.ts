import { logout } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
