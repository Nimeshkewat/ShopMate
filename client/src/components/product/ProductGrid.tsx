import { Button } from "@/components/ui/button";
import AppPagination from "@/components/common/AppPagination";
import type { PaginationMeta, Product } from "../../types/product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products?: Product[];
  pagination?: PaginationMeta;
  page?: number;
  onPageChange?: (page: number) => void;
  isLoading: boolean;
  isError: boolean;
  onReset: () => void;
}

export default function ProductGrid({
  products = [],
  pagination,
  page,
  onPageChange,
  isLoading,
  isError,
  onReset,
}: Props) {
  if (isError) {
    return (
      <p role="alert" className="mt-10 text-center text-destructive">
        Couldn't load products. Please try again.
      </p>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <>
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="font-medium">No products match your filters</p>
          <Button variant="outline" onClick={onReset}>
            Clear filters
          </Button>
        </div>
        {pagination && onPageChange && (
          <AppPagination
            pagination={pagination}
            page={page}
            onPageChange={onPageChange}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }, (_, i) => <ProductCardSkeleton key={i} />)
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
      {pagination && onPageChange && (
        <AppPagination
          pagination={pagination}
          page={page}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
