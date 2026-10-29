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
    <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
      <table className="w-full min-w-205 text-sm">
        <thead className="bg-primary/10 text-left">
          <tr>
            {headings.map((heading) => (
              <th key={heading} scope="col" className="px-4 py-3 font-semibold">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-4 py-3">
                {product.images ? (
                  <img
                    src={product.images[0].url}
                    alt=""
                    className="size-11 rounded-md object-cover"
                  />
                ) : (
                  <span className="grid size-11 place-items-center rounded-md bg-muted text-muted-foreground">
                    <ImageOff className="size-4" />
                  </span>
                )}
              </td>
              <td className="max-w-64 px-4 py-3 font-medium">
                <span className="line-clamp-2">{product.name}</span>
              </td>
              {showSeller && (
                <td className="px-4 py-3 text-muted-foreground">
                  {product.sellerId.username ?? "—"}
                </td>
              )}
              <td className="px-4 py-3 text-muted-foreground">
                {product.category || "—"}
              </td>
              <td className="px-4 py-3">{formatPrice(product.price)}</td>
              <td
                className={cn(
                  "px-4 py-3",
                  product.stock === 0
                    ? "font-medium text-red-500"
                    : product.stock <= 5 && "font-medium text-amber-500",
                )}
              >
                {product.stock === 0 ? "Out of stock" : product.stock}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  {product.rating}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Link
                      to={`/product/${product._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
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
