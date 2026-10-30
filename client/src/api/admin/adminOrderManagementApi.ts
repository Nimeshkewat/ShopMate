import type {
  GetAllAdminOrdersResponse,
  GetAminOrderResponse,
  UpdateAdminOrderStatusResponse,
  UpdatePaymentStatusPayload,
} from "@/types/admin";
import { api } from "../apiClient";
import type { PaginationParams } from "@/types/pagination";

const BASE = "/admin/orders";
export const getAllAdminOrders = async (
  params?: PaginationParams,
): Promise<GetAllAdminOrdersResponse> => {
  const response = await api.get<GetAllAdminOrdersResponse>(BASE, { params });
  return response.data;
};

export const getAdminOrder = async (
  id: string,
): Promise<GetAminOrderResponse> => {
  const response = await api.get<GetAminOrderResponse>(`${BASE}/${id}`);
  return response.data;
};

export const updateAdminOrderPaymentStatus = async ({
  id,
  orderStatus,
}: UpdatePaymentStatusPayload): Promise<UpdateAdminOrderStatusResponse> => {
  const response = await api.patch<UpdateAdminOrderStatusResponse>(
    `${BASE}/${id}`,
    { orderStatus },
  );
  return response.data;
};
