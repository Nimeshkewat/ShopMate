import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShopProducts } from "@/hooks/shop/useShopProducts";
import AppPagination from "@/components/common/AppPagination";
import ShopAvatar from "@/components/shop/ShopAvatar";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import ProductCard from "@/components/product/ProductCard";

const LIMIT = 12;
function ShopContent({ id }: { id: string }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useShopProducts(id, {
    page,
    limit: LIMIT,
  });

  const shop = data?.shop;
  const products = data?.products ?? [];
  const total = data?.pagination.total ?? 0;

  const changePage = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isError) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-3 px-4 text-center">
        <h1 className="text-2xl font-bold">Shop not found</h1>
        <p className="text-muted-foreground">
          This shop doesn't exist or isn't open yet.
        </p>
        <Button>
          <Link to="/shops">Browse all shops</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        to="/shops"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All shops
      </Link>

      <header className="mt-4 flex items-center gap-4 rounded-xl border border-primary/15 bg-primary/10 p-5">
        {shop ? (
          <>
            <ShopAvatar
              image={shop.shopImage}
              name={shop.shopName}
              className="size-20"
            />
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold sm:text-3xl">
                {shop.shopName}
              </h1>
              <p className="text-sm text-muted-foreground">
                {total} {total === 1 ? "product" : "products"}
              </p>
            </div>
          </>
        ) : (
          <div className="flex animate-pulse items-center gap-4" aria-hidden>
            <div className="size-20 rounded-xl bg-primary/15" />
            <div className="space-y-2">
              <div className="h-6 w-48 rounded bg-primary/15" />
              <div className="h-4 w-24 rounded bg-primary/15" />
            </div>
          </div>
        )}
      </header>

      <div className="mt-6">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            This shop hasn't listed any products yet.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="mt-8">
              <AppPagination page={page} onPageChange={changePage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Shop() {
  const { id } = useParams();
  // key resets the page number when the user moves from one shop to another
  return <ShopContent key={id} id={id ?? ""} />;
}

export default Shop;
