import { deleteAdminProduct } from "@/api/admin/productManagementApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAdminProduct = () => {
  return useMutation({
    mutationFn: (id: string) => deleteAdminProduct(id),
  });
};
