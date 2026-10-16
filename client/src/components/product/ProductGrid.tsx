import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products?: Product[];
  isLoading: boolean;
  isError: boolean;
  onReset: () => void;
}

export default function ProductGrid({
  products = [],
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
      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <p className="font-medium">No products match your filters</p>
        <Button variant="outline" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner size="sm" className="text-primary" />
          <span>Loading products...</span>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? "product" : "products"}{" "}
          found
        </p>
      )}
      <div className="mt-4 grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }, (_, i) => <ProductCardSkeleton key={i} />)
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </>
  );
}
