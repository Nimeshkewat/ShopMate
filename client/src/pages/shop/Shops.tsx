import { useState } from "react";
import { useShops } from "@/hooks/shop/useShops";
import AppPagination from "@/components/common/AppPagination";
import ShopCard, { ShopCardSkeleton } from "@/components/shop/ShopCard";

const LIMIT = 12;
function Shops() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useShops({
    page,
    limit: LIMIT,
  });

  const shops = data?.shops ?? [];
  const changePage = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <header>
        <h1 className="text-3xl font-bold">Shops</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse products from our trusted sellers.
        </p>
      </header>

      <div className="mt-8">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <ShopCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <p
            role="alert"
            className="flex items-center justify-center gap-3 py-16 text-destructive"
          >
            Couldn't load shops.
            <button
              type="button"
              onClick={() => refetch()}
              className="font-medium underline"
            >
              Retry
            </button>
          </p>
        ) : shops.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No shops are open yet. Check back soon.
          </p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {shops.map((shop) => (
                <ShopCard key={shop._id} shop={shop} />
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

export default Shops;
