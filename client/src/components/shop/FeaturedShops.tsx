import { Link } from "react-router-dom";
import { useShops } from "@/hooks/shop/useShops";
import ShopCard, { ShopCardSkeleton } from "./ShopCard";

function FeaturedShops() {
  const { data, isLoading } = useShops({ page: 1, limit: 4 });
  const shops = data?.shops ?? [];

  if (!isLoading && shops.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Shop by Seller</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse products from our trusted sellers.
          </p>
        </div>
        <Link
          to="/shops"
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          View all shops
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => <ShopCardSkeleton key={i} />)
          : shops.map((shop) => <ShopCard key={shop._id} shop={shop} />)}
      </div>
    </section>
  );
}

export default FeaturedShops;
