import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/api/apiError";
import {
  createSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,
} from "@/api/seller/sellerProductApi";
import { queryKey } from "./useSellerProducts";
import type {
  CreateProductPayload,
  CreateProductResponse,
  DeleteProductResponse,
  UpdateProductPayload,
  UpdateProductResponse,
} from "@/types/seller";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateProductResponse, ApiError, CreateProductPayload>({
    mutationFn: createSellerProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateProductResponse,
    ApiError,
    { id: string; values: UpdateProductPayload }
  >({
    mutationFn: ({ id, values }) => updateSellerProduct(id, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteProductResponse, ApiError, string>({
    mutationFn: deleteSellerProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};
