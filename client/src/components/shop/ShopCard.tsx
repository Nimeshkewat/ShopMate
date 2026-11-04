import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Shop } from "@/types/shop";
import ShopAvatar from "./ShopAvatar";

export function ShopCardSkeleton() {
  return (
    <div
      className="flex animate-pulse items-center gap-4 rounded-xl bg-card p-4 ring-1 ring-border/60 shadow-sm"
      aria-hidden
    >
      <div className="size-14 rounded-xl bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/3 rounded bg-muted" />
      </div>
    </div>
  );
}

function ShopCard({ shop }: { shop: Shop }) {
  return (
    shop.productCount && (
      <Link
        to={`/shops/${shop._id}`}
        className="group flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30"
      >
        <ShopAvatar image={shop.shopImage} name={shop.shopName} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            {shop.shopName}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {shop.productCount}{" "}
            {shop.productCount === 1 ? "product" : "products"}
          </p>
        </div>
        <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </Link>
    )
  );
}
export default ShopCard;
