import { api } from "./apiClient";
import { type SignupValues } from "../schema/auth";
import type { AuthResponse } from "@/types/auth";

export const sighup = async (input: SignupValues): Promise<AuthResponse> => {
  const resposne = await api.post<AuthResponse>("/auth/register", input);
  return resposne.data;
};
