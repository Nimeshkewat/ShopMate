import type { ApiError } from "@/api/apiError";
import { fetchCart } from "@/api/cartApi";
import { useAuth } from "@/context/AuthContext";
import type { CartResponse } from "@/types/cart";
import { useQuery } from "@tanstack/react-query";

export const useCart = () => {
  const { isAuthenticated } = useAuth();

  return useQuery<CartResponse, ApiError>({
    queryKey: ["cart"],
    queryFn: fetchCart,
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
  });
};
