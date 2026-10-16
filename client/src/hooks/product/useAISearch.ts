import type { ApiError } from "@/api/apiError";
import { fetchAiFilteredProducts } from "@/api/productApi";
import type { AISearchResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export const useAISearch = (prompt: string) => {
  return useQuery<AISearchResponse, ApiError>({
    queryKey: ["ai-search", prompt],
    queryFn: () => fetchAiFilteredProducts(prompt),
    enabled: !!prompt.trim(),
    staleTime: 5 * 60 * 1000,
  });
};
