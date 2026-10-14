import type { ApiError } from "@/api/apiError";
import { updateProfile } from "@/api/userApi";
import type { UpdateProfileResponse } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  return useMutation<UpdateProfileResponse, ApiError, FormData>({
    mutationFn: updateProfile,
  });
};
