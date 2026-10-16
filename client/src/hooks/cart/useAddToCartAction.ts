import { toast } from "sonner";
import { getErrorMessage } from "@/api/apiClient";
import { useAuth } from "@/context/AuthContext";
import { useAddToCart } from "@/hooks/cart/useAddToCart"; // your existing mutation hook

// Wraps your add-to-cart mutation with the sign-in check and toasts,
// so cards, carousels and the details page can all share it.
export function useAddToCartAction() {
  const { isAuthenticated } = useAuth();
  const { mutate, isPending } = useAddToCart();

  const addToCart = (
    productId: string,
    quantity = 1,
    options?: { onSuccess?: () => void },
  ) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to your cart");
      return;
    }
    mutate(
      { productId, quantity },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Item added to cart");
          options?.onSuccess?.();
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );
  };

  return { addToCart, isPending };
}
