import type { ProfileResponse, UpdateProfileResponse } from "@/types/user";
import { api } from "./apiClient";

export const profile = async (): Promise<ProfileResponse> => {
  const response = await api.get<ProfileResponse>("/users");
  return response.data;
};

export const updateProfile = async (
  input: FormData,
): Promise<UpdateProfileResponse> => {
  const response = await api.patch<UpdateProfileResponse>("/users", input);
  return response.data;
};
