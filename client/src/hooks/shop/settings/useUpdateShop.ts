import { updateShop } from "@/api/seller/shopSettingsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";

export const useUpdateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateShop,
    onSuccess: async (response) => {
      queryClient.setQueryData(queryKeys.shopSettings, response);
      await queryClient.invalidateQueries({ queryKey: queryKeys.shops });
    },
  });
};
