import { useProducts } from "@/hooks/product/useProducts"; // your existing query hook
import type { ProductQuery } from "../../types/product";
import ProductGrid from "./ProductGrid";

interface Props {
  params: ProductQuery;
  onReset: () => void;
}

export default function CatalogResults({ params, onReset }: Props) {
  const { data, isLoading, isError } = useProducts(params);
  return (
    <ProductGrid
      products={data?.products}
      isLoading={isLoading}
      isError={isError}
      onReset={onReset}
    />
  );
}
