import { fetchAiFilteredProducts } from "@/api/productApi";
import { useQuery } from "@tanstack/react-query";

export const useAISearch = (prompt: string) => {
  return useQuery({
    queryKey: ["ai-search", prompt],
    queryFn: () => fetchAiFilteredProducts(prompt),
    enabled: !!prompt.trim(),
    staleTime: 5 * 60 * 1000,
  });
};
