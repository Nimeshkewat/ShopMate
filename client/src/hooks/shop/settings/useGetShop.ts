import { getShop } from "@/api/seller/shopSettingsApi";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetShop = () => {
  return useQuery({
    queryKey: queryKeys.shopSettings,
    queryFn: getShop,
  });
};
