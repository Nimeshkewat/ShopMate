import type { AdminDashboardResponse } from "@/types/admin";
import { api } from "../apiClient";

const BASE = "/admin";
export const getAdminDashboard = async (): Promise<AdminDashboardResponse> => {
  const response = await api.get<AdminDashboardResponse>(`${BASE}/dashboard`);
  return response.data;
};
