import type { ApiError } from "@/api/apiError";
import { updatePassword } from "@/api/userApi";
import type { UpdatePasswordValues } from "@/schema/user";
import type { UpdatePasswordResponse } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePassword = () => {
  return useMutation<UpdatePasswordResponse, ApiError, UpdatePasswordValues>({
    mutationFn: updatePassword,
  });
};
