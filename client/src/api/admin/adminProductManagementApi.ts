import type {
  DeleteAdminProductResponse,
  GetAllAdminProductsResponse,
} from "@/types/admin";
import { api } from "../apiClient";
import type { PaginationParams } from "@/types/pagination";

const BASE = "/admin/products";
export const getAllAdminProducts = async (
  params?: PaginationParams,
): Promise<GetAllAdminProductsResponse> => {
  const response = await api.get<GetAllAdminProductsResponse>(BASE, { params });
  return response.data;
};

export const deleteAdminProduct = async (
  id: string,
): Promise<DeleteAdminProductResponse> => {
  const resposne = await api.delete<DeleteAdminProductResponse>(
    `${BASE}/${id}`,
  );
  return resposne.data;
};
