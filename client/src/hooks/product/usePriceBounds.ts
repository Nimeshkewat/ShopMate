import { fetchPriceBounds } from "@/api/productApi";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const usePriceBounds = () => {
  return useQuery({
    queryKey: queryKeys.productBounds,
    queryFn: fetchPriceBounds,
    staleTime: 2 * 60 * 1000,
  });
};
