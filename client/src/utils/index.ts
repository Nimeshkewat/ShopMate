import type { Product, StockStatus } from "../types/product";

export type { StockStatus };

export const getStockStatus = (stock: number): StockStatus =>
  stock === 0 ? "out" : stock <= 5 ? "limited" : "in";

export const stockBadge: Record<
  StockStatus,
  { label: string; className: string }
> = {
  in: {
    label: "In Stock",
    className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  limited: {
    label: "Limited Stock",
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  out: {
    label: "Out of Stock",
    className: "bg-red-500/15 text-red-600 dark:text-red-400",
  },
};

const NEW_PRODUCT_DAYS = 30;
export const isNewProduct = (product: Pick<Product, "createdAt">) =>
  Date.now() - new Date(product.createdAt).getTime() <
  NEW_PRODUCT_DAYS * 86_400_000;

export interface ProductFilterValues {
  maxPrice: number;
  minRating: number | null;
  availability: StockStatus | null;
}

export const MAX_PRICE = 10000;

export const defaultFilters: ProductFilterValues = {
  maxPrice: MAX_PRICE,
  minRating: null,
  availability: null,
};
