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
      description="Products having most sales"
      className="lg:col-span-2"
    >
      {products.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No sales yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-130 text-sm">
            <thead className="bg-primary/10 text-left">
              <tr>
                {["Image", "Title", "Category", "Total Sold", "Rating"].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-4 py-3 font-semibold first:rounded-l-lg last:rounded-r-lg"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.productId}>
                  <td className="px-4 py-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt=""
                        className="size-10 rounded-md object-cover"
                      />
                    ) : (
                      <span className="grid size-10 place-items-center rounded-md bg-muted text-muted-foreground">
                        <ImageOff className="size-4" />
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {product.totalSold}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      {product.rating.toFixed(2)}
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
