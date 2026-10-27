import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,
} from "@/api/seller/sellerProductApi";
import { queryKey } from "./useSellerProducts";
import type { UpdateProductPayload } from "@/types/seller";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSellerProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: UpdateProductPayload;
    }) => updateSellerProduct(id, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSellerProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};
