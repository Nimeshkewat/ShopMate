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
  const response = await api.post<AuthResponse>(`${BASE}/register`, input);
  return response.data;
};

export const login = async (input: LoginValues): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(`${BASE}/login`, input);
  return response.data;
};

export const logout = async (): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(`${BASE}/logout`);
  return response.data;
};

export const forgotPassword = async (
  input: ForgotPasswordValues,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${BASE}/forgot-password`,
    input,
  );
  return response.data;
};

export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<AuthResponse> => {
  const { token, ...input } = payload;
  const response = await api.post<AuthResponse>(
    `${BASE}/reset-password/${encodeURIComponent(token)}`,
    { newPassword: input.newPassword },
  );
  return response.data;
};

export const validateResetPasswordToken = async (
  token: string,
): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>(
    `${BASE}/reset-password/${encodeURIComponent(token)}`,
  );
  return response.data;
};
