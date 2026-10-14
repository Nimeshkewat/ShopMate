import type {
  ProfileResponse,
  UpdatePasswordResponse,
  UpdateProfileResponse,
} from "@/types/user";
import { api } from "./apiClient";
import type { UpdatePasswordValues } from "@/schema/user";

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

export const updatePassword = async (
  input: UpdatePasswordValues,
): Promise<UpdatePasswordResponse> => {
  const response = await api.patch("/users/update-password", input);
  return response.data;
};
