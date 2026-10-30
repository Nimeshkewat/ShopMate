import { updateAdminOrderPaymentStatus } from "@/api/admin/adminOrderManagementApi";
import type { UpdatePaymentStatusPayload } from "@/types/admin";
import { useMutation } from "@tanstack/react-query";

export const useUpdateOrderPaymentStatus = () => {
  return useMutation({
    mutationFn: (payload: UpdatePaymentStatusPayload) =>
      updateAdminOrderPaymentStatus(payload),
  });
};
