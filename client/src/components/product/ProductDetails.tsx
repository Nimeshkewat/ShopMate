import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAddToCartAction } from "@/hooks/cart/useAddToCartAction";
import { useProduct } from "@/hooks/product/useProduct";
import { cn } from "@/lib/utils";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductTabs";
import PurchaseBox from "./PurchaseBox";
import RatingStars from "../review/RatingStars";
import { getStockStatus, isNewProduct, stockBadge } from "@/utils/index";
import { CURRENCY } from "@/utils/constants";

function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner size="sm" className="text-primary" />
        <span>Loading product details...</span>
      </div>
      <div className="grid animate-pulse gap-8 lg:grid-cols-2" aria-hidden>
        <div className="aspect-4/3 rounded-xl bg-primary/15" />
        <div className="space-y-4">
          <div className="h-6 w-24 rounded bg-primary/15" />
          <div className="h-9 w-3/4 rounded bg-primary/15" />
          <div className="h-5 w-1/3 rounded bg-primary/15" />
          <div className="h-9 w-1/4 rounded bg-primary/15" />
          <div className="h-40 rounded-xl bg-primary/15" />
        </div>
      </div>
    </div>
  );
}

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProduct(id ?? "");
  const { addToCart, isPending } = useAddToCartAction();
  const product = data?.product;

  if (isLoading) return <DetailsSkeleton />;

  if (isError || !product) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-3 px-4 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="text-muted-foreground">
          This product may have been removed.
        </p>
        <Button>
          <Link to="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  const stock = stockBadge[getStockStatus(product.stock)];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery
          key={product._id}
          images={product.images.map((i) => i.url)}
          name={product.name}
        />

        <div className="space-y-4">
          <div className="flex gap-2">
            {isNewProduct(product) && (
              <span className="rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                NEW
              </span>
            )}
            {product.rating >= 4.5 && (
              <span className="rounded bg-linear-to-r from-amber-500 to-red-500 px-2 py-0.5 text-xs font-bold text-white">
                TOP RATED
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">{product.name}</h1>

          <div className="flex flex-wrap items-center gap-2">
            <RatingStars rating={product.rating} />
            <span className="font-semibold">{product.rating.toFixed(2)}</span>
            {product.reviewCount !== undefined && (
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount}) reviews
              </span>
            )}
          </div>

          <p className="text-3xl font-bold">
            {CURRENCY}
            {product.price.toFixed(2)}
          </p>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Category: {product.category}</span>
            <span
              className={cn(
                "rounded px-2 py-0.5 text-xs font-medium",
                stock.className,
              )}
            >
              {stock.label}
            </span>
          </div>

          <PurchaseBox
            key={product._id}
            name={product.name}
            stock={product.stock}
            isPending={isPending}
            onAddToCart={(quantity) => addToCart(product._id, quantity)}
            onBuyNow={(quantity) =>
              addToCart(product._id, quantity, {
                onSuccess: () => navigate("/checkout"),
              })
            }
          />
        </div>
      </div>

      <div className="mt-10">
        <ProductTabs product={product} />
      </div>
    </div>
  );
}

export default ProductDetails;
