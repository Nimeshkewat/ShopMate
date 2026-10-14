import type { ApiError } from "@/api/apiError";
import { profile } from "@/api/userApi";
import type { ProfileResponse } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery<ProfileResponse, ApiError>({
    queryKey: ["profile"],
    queryFn: profile,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
