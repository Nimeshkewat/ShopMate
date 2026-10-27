import { fetchCart } from "@/api/cartApi";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

export const useCart = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
  });
};
