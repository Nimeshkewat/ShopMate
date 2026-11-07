import { api } from "@/api/apiClient";
import type { ProductsResponse } from "@/types/product";
import type {
  CreateProductPayload,
  CreateProductResponse,
  DeleteProductResponse,
  UpdateProductPayload,
  UpdateProductResponse,
} from "@/types/seller";
import type { PaginationParams } from "@/types/pagination";

const SELLER_PRODUCTS_URL = "/seller/products";

export const fetchSellerProducts = async (
  params?: PaginationParams,
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(SELLER_PRODUCTS_URL, {
    params,
  });
  return response.data;
};

export const createSellerProduct = async ({
  images,
  ...values
}: CreateProductPayload): Promise<CreateProductResponse> => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  images.forEach((file) => {
    formData.append("images", file);
  });

  const response = await api.post<CreateProductResponse>(
    SELLER_PRODUCTS_URL,
    formData,
  );
  return response.data;
};

export const updateSellerProduct = async (
  id: string,
  values: UpdateProductPayload,
): Promise<UpdateProductResponse> => {
  const response = await api.patch<UpdateProductResponse>(
    `${SELLER_PRODUCTS_URL}/${id}`,
    values,
  );
  return response.data;
};

export const deleteSellerProduct = async (
  id: string,
): Promise<DeleteProductResponse> => {
  const response = await api.delete<DeleteProductResponse>(
    `${SELLER_PRODUCTS_URL}/${id}`,
  );
  return response.data;
};
