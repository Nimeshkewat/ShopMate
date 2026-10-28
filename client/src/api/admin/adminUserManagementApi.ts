import type { AllUsersResponse, UserResponse } from "@/types/admin";
import { api } from "../apiClient";
import type { PaginationParams } from "@/types/pagination";

const BASE = "/admin/users";

export const getUsers = async (
  params?: PaginationParams,
): Promise<AllUsersResponse> => {
  const response = await api.get<AllUsersResponse>(BASE, { params });
  return response.data;
};

export const getUser = async (id: string): Promise<UserResponse> => {
  const response = await api.get<UserResponse>(`${BASE}/${id}`);
  return response.data;
};

export const blockUser = async (id: string): Promise<UserResponse> => {
  const response = await api.patch<UserResponse>(`${BASE}/${id}/block`);
  return response.data;
};

export const unblockUser = async (id: string): Promise<UserResponse> => {
  const response = await api.patch<UserResponse>(`${BASE}/${id}/unblock`);
  return response.data;
};
