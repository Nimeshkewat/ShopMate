import { toast } from "sonner";
import { getErrorMessage } from "@/api/apiClient";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "./useCart";
import { useRemoveFromCart } from "@/hooks/cart/useRemoveFromCart";
import { useUpdateCartItem } from "@/hooks/cart/useUpdateCartItem";
import type { CartItem } from "../../types/cart";

export function useCartActions() {
  const { isAuthenticated } = useAuth();
  const { data, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveFromCart();

  const items: CartItem[] = isAuthenticated ? (data?.cart?.items ?? []) : [];
  const onError = (error: unknown) => toast.error(getErrorMessage(error));

  return {
    items,
    isLoading: isAuthenticated && isLoading,
    changeQuantity: (productId: string, quantity: number) =>
      updateItem.mutate({ productId, quantity }, { onError }),
    removeItem: (productId: string) =>
      removeItem.mutate({ productId }, { onError }),
  };
}
