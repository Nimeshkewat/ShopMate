import { useProducts } from "@/hooks/product/useProducts"; // your existing query hook
import type { ProductQuery } from "../../types/product";
import ProductGrid from "./ProductGrid";

interface Props {
  params: ProductQuery;
  onPageChange: (page: number) => void;
  onReset: () => void;
}

export default function CatalogResults({
  params,
  onPageChange,
  onReset,
}: Props) {
  const { data, isLoading, isError } = useProducts(params);
  return (
    <ProductGrid
      products={data?.products}
      pagination={data?.pagination}
      page={params.page}
      onPageChange={onPageChange}
      isLoading={isLoading}
      isError={isError}
      onReset={onReset}
    />
  );
}
