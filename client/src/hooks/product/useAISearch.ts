import { fetchAiFilteredProducts } from "@/api/productApi";
import { useMutation } from "@tanstack/react-query";

export const useAISearch = () =>
  useMutation({
    mutationFn: fetchAiFilteredProducts,
    retry: false,
  });
