import { Link } from "react-router-dom";
import { ImageOff, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/index";
import type { AdminProduct } from "@/types/admin";

interface Props {
  products: AdminProduct[];
  onDelete: (product: AdminProduct) => void;
}

function AdminProductsTable({ products, onDelete }: Props) {
  // the Seller column only appears when the backend sends seller names
  const showSeller = products.some((p) => p.sellerId.username);
  const headings = [
    "Image",
    "Title",
    ...(showSeller ? ["Seller"] : []),
    "Category",
    "Price",
    "Stock",
    "Rating",
    "Actions",
  ];

  return (
    <div className="overflow-x-auto rounded-xl bg-card shadow-sm ring-1 ring-border/60">
      <table className="w-full min-w-205 text-sm">
        <thead>
          <tr className="border-b border-border/60">
            {headings.map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {products.map((product) => (
            <tr
              key={product._id}
              className="transition-colors hover:bg-secondary/40"
            >
              <td className="px-4 py-2.5">
                {product.images?.[0]?.url ? (
                  <img
                    src={product.images[0].url}
                    alt=""
                    className="size-11 rounded-lg bg-background object-contain p-1 ring-1 ring-border/40"
                  />
                ) : (
                  <span className="grid size-11 place-items-center rounded-lg bg-secondary text-muted-foreground">
                    <ImageOff className="size-4" />
                  </span>
                )}
              </td>
              <td className="max-w-64 px-4 py-2.5 font-medium text-foreground">
                <span className="line-clamp-2">{product.name}</span>
              </td>
              {showSeller && (
                <td className="px-4 py-2.5 text-xs text-muted-foreground">
                  {product.sellerId.username ?? "—"}
                </td>
              )}
              <td className="px-4 py-2.5 text-xs text-muted-foreground">
                {product.category || "—"}
              </td>
              <td className="px-4 py-2.5 font-semibold text-foreground tabular-nums">
                {formatPrice(product.price)}
              </td>
              <td
                className={cn(
                  "px-4 py-2.5 text-xs tabular-nums",
                  product.stock === 0
                    ? "font-medium text-red-600 dark:text-red-400"
                    : product.stock <= 5
                    ? "font-medium text-amber-600 dark:text-amber-400"
                    : "text-muted-foreground",
                )}
              >
                {product.stock === 0 ? "Out of stock" : product.stock}
              </td>
              <td className="px-4 py-2.5">
                <span className="inline-flex items-center gap-1 text-xs">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums font-medium">{product.rating}</span>
                </span>
              </td>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Link
                      to={`/product/${product._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 border-destructive/30 text-xs text-destructive hover:bg-destructive/10 hover:border-destructive/50"
                    onClick={() => onDelete(product)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductsTable;
