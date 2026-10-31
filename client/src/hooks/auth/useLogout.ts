import { logout } from "@/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.resetQueries();
      queryClient.clear();
    },
  });
};
