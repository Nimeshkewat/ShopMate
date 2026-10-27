import { useQuery } from "@tanstack/react-query";
import { fetchSellerProducts } from "@/api/seller/sellerProductApi";

export const queryKey = ["seller-products"] as const;

export const useSellerProducts = () => {
  return useQuery({
    queryKey,
    queryFn: fetchSellerProducts,
    staleTime: 2 * 60 * 1000,
  });
};
