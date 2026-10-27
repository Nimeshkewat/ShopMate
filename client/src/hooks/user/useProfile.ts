import { profile } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
