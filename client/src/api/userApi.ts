import type {
  ProfileResponse,
  RemoveAvatarResponse,
  UpdatePasswordResponse,
  UpdateProfileResponse,
} from "@/types/user";
import { api } from "./apiClient";
import type { UpdatePasswordValues } from "@/schema/user";

const BASE = "/users";
export const profile = async (): Promise<ProfileResponse> => {
  const response = await api.get<ProfileResponse>(BASE);
  return response.data;
};

export const updateProfile = async (
  input: FormData,
): Promise<UpdateProfileResponse> => {
  const response = await api.patch<UpdateProfileResponse>(BASE, input);
  return response.data;
};

export const removeAvatar = async (): Promise<RemoveAvatarResponse> => {
  const response = await api.delete<RemoveAvatarResponse>(`${BASE}/avatar`);
  return response.data;
};

export const updatePassword = async (
  input: UpdatePasswordValues,
): Promise<UpdatePasswordResponse> => {
  const response = await api.patch(`${BASE}/update-password`, input);
  return response.data;
};
