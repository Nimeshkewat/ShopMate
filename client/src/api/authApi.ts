import { api } from "./apiClient";
import {
  type ForgotPasswordValues,
  type LoginValues,
  type SignupValues,
} from "../schema/auth";
import type { AuthResponse } from "@/types/auth";

export const sighup = async (input: SignupValues): Promise<AuthResponse> => {
  const resposne = await api.post<AuthResponse>("/auth/register", input);
  return resposne.data;
};

export const login = async (input: LoginValues): Promise<AuthResponse> => {
  const resposne = await api.post<AuthResponse>("/auth/login", input);
  return resposne.data;
};

export const logout = async (): Promise<AuthResponse> => {
  const resposne = await api.post<AuthResponse>("/auth/logout");
  return resposne.data;
};

export const forgotPassword = async (
  input: ForgotPasswordValues,
): Promise<AuthResponse> => {
  const resposne = await api.post<AuthResponse>("/auth/forgot-password", input);
  return resposne.data;
};

export const resetPassword = async (token: string): Promise<AuthResponse> => {
  const resposne = await api.post<AuthResponse>(
    `/auth/reset-password/${token}`,
  );
  return resposne.data;
};
