import { api } from "./apiClient";
import {
  type ForgotPasswordValues,
  type LoginValues,
  type ResetPasswordPayload,
  type SignupValues,
} from "../schema/auth";
import type { AuthResponse } from "@/types/auth";

const BASE = "/auth";
export const sighup = async (input: SignupValues): Promise<AuthResponse> => {
  const resposne = await api.post<AuthResponse>(`${BASE}/register`, input);
  return resposne.data;
};

export const login = async (input: LoginValues): Promise<AuthResponse> => {
  const resposne = await api.post<AuthResponse>(`${BASE}/login`, input);
  return resposne.data;
};

export const logout = async (): Promise<AuthResponse> => {
  const resposne = await api.post<AuthResponse>(`${BASE}/logout`);
  return resposne.data;
};

export const forgotPassword = async (
  input: ForgotPasswordValues,
): Promise<AuthResponse> => {
  const resposne = await api.post<AuthResponse>(
    `${BASE}/forgot-password`,
    input,
  );
  return resposne.data;
};

export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<AuthResponse> => {
  const { token, ...input } = payload;
  const resposne = await api.post<AuthResponse>(
    `${BASE}/reset-password/${encodeURIComponent(token)}`,
    { newPassword: input.newPassword },
  );
  return resposne.data;
};

export const validateResetPasswordToken = async (
  token: string,
): Promise<AuthResponse> => {
  const resposne = await api.get<AuthResponse>(
    `${BASE}/reset-password/${encodeURIComponent(token)}`,
  );
  return resposne.data;
};
