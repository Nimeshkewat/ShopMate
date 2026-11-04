import { ImageOff, Star } from "lucide-react";
import type { SellerDashboardStats } from "@/api/seller/sellerDashboardApi";
import SellerDashboardCard from "./SellerDashboardCard";

function TopProductsTable({
  products,
}: {
  products: SellerDashboardStats["topProducts"];
}) {
  return (
    <SellerDashboardCard
      title="Top Products"
      description="Products with the most sales"
      className="lg:col-span-2"
    >
      {products.length === 0 ? (
        <p className="py-8 text-center text-xs text-muted-foreground">
          No sales yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg ring-1 ring-border/60">
          <table className="w-full min-w-130 text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/40 text-left">
                {["Image", "Title", "Category", "Total Sold", "Rating"].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {products.map((product) => (
                <tr key={product.productId} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-2.5">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt=""
                        className="size-10 rounded-lg bg-background object-contain p-0.5 ring-1 ring-border/40"
                      />
                    ) : (
                      <span className="grid size-10 place-items-center rounded-lg bg-secondary text-muted-foreground">
                        <ImageOff className="size-4" />
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-foreground">{product.name}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">
                    {product.category}
                  </td>
                  <td className="px-4 py-2.5 font-semibold tabular-nums text-foreground">
                    {product.totalSold}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="tabular-nums font-medium">{product.rating.toFixed(2)}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SellerDashboardCard>
  );
}

export default TopProductsTable;
