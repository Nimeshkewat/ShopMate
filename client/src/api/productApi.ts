import { api } from "./apiClient";
import type {
  AISearchResponse,
  ProductDetailsResponse,
  ProductPriceBoundsResponse,
  ProductQuery,
  ProductsResponse,
} from "@/types/product";

const BASE = "/products";

export const fetchProducts = async (
  query?: ProductQuery,
): Promise<ProductsResponse> => {
  const params: Record<string, string | number> = {};

  if (query?.search?.trim()) {
    params.search = query.search.trim();
  }
  if (query?.category) {
    params.category = query.category;
  }
  if (query?.maxPrice !== undefined) {
    params.price = `0-${query.maxPrice}`;
  } else if (query?.price) {
    params.price = query.price;
  }
  if (query?.minRating !== undefined && query.minRating !== null) {
    params.rating = query.minRating;
  } else if (query?.rating !== undefined && query.rating !== null) {
    params.rating = query.rating;
  }
  if (query?.availability) {
    params.availability = query.availability;
  }
  if (query?.page) {
    params.page = query.page;
  }
  if (query?.limit) {
    params.limit = query.limit;
  }

  const response = await api.get<ProductsResponse>(BASE, {
    params,
  });
  return {
    ...response.data,
    products: response.data.products ?? [],
  };
};

export const fetchProductById = async (
  id: string,
): Promise<ProductDetailsResponse> => {
  const response = await api.get<ProductDetailsResponse>(`${BASE}/${id}`);
  return response.data;
};

export const fetchAiFilteredProducts = async (
  prompt: string,
): Promise<AISearchResponse> => {
  const response = await api.post<AISearchResponse>(`${BASE}/ai-search`, {
    prompt,
  });
  return response.data;
};

export const fetchPriceBounds =
  async (): Promise<ProductPriceBoundsResponse> => {
    const response = await api.get<ProductPriceBoundsResponse>(
      `${BASE}/price-bounds`,
    );
    return response.data;
  };
