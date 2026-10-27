import { api } from "./apiClient";
import type {
  CartActionResponse,
  CartItem,
  CartResponse,
  RawCartResponse,
} from "@/types/cart";

const transformCartResponse = (
  rawCart: RawCartResponse["cart"],
): CartResponse["cart"] => {
  const items: CartItem[] = (rawCart?.items ?? []).map((item) => {
    const isPopulated =
      typeof item.productId === "object" && item.productId !== null;
    const prod = isPopulated
      ? (item.productId as {
          _id: string;
          name: string;
          images?: Array<{ url: string }>;
          stock?: number;
          price: number;
        })
      : null;

    const productId =
      prod?._id ?? (typeof item.productId === "string" ? item.productId : "");
    const name = prod?.name ?? "Product";
    const image = prod?.images?.[0]?.url ?? "";
    const price = item.price ?? prod?.price ?? 0;
    const stock = prod?.stock;

    return {
      productId,
      name,
      image,
      price,
      quantity: item.quantity,
      stock,
    };
  });

  return {
    _id: rawCart?._id,
    userId: rawCart?.userId,
    items,
  };
};

const BASE = "/cart";

export const fetchCart = async (): Promise<CartResponse> => {
  try {
    const response = await api.get<RawCartResponse>(BASE);
    return {
      success: response.data.success,
      cart: transformCartResponse(response.data.cart),
    };
  } catch (error: any) {
    // If backend returns 404 (Cart not found), return empty cart gracefully
    if (error?.response?.status === 404) {
      return {
        success: true,
        cart: { items: [] },
      };
    }
    throw error;
  }
};

export const addToCart = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<CartActionResponse> => {
  const response = await api.post<CartActionResponse>(`${BASE}/${productId}`, {
    quantity,
    productId,
  });
  return response.data;
};

export const updateCartItem = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<CartActionResponse> => {
  const response = await api.patch<CartActionResponse>(`${BASE}/${productId}`, {
    quantity,
  });
  return response.data;
};

export const removeFromCart = async ({
  productId,
}: {
  productId: string;
}): Promise<CartActionResponse> => {
  const response = await api.delete<CartActionResponse>(`${BASE}/${productId}`);
  return response.data;
};

export const clearCart = async (): Promise<CartActionResponse> => {
  const response = await api.delete<CartActionResponse>(`${BASE}/clear`);
  return response.data;
};
