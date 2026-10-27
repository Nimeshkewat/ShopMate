import type {
  ApproveSellerResponse,
  PendingSellersResponse,
  RejectSellerResponse,
} from "@/types/admin";
import { api } from "../apiClient";
import type { PaginationParams } from "@/types/pagination";

const BASE = "/admin";

export const getPendingSellers = async (
  params?: PaginationParams,
): Promise<PendingSellersResponse> => {
  const response = await api.get<PendingSellersResponse>(
    `${BASE}/pending-sellers`,
    { params },
  );
  return response.data;
};

export const approveSeller = async (
  id: string,
): Promise<ApproveSellerResponse> => {
  const response = await api.patch<ApproveSellerResponse>(
    `${BASE}/approve-seller/${id}`,
  );
  return response.data;
};

export const rejectSeller = async (
  id: string,
): Promise<RejectSellerResponse> => {
  const response = await api.patch<RejectSellerResponse>(
    `${BASE}/reject-seller/${id}`,
  );
  return response.data;
};
