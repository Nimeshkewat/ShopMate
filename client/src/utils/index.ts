import type { Product, StockStatus } from "../types/product";
import type { CartItem } from "../types/cart";

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

//*
const TAX_RATE = 0.18;
const FREE_SHIPPING_ABOVE = 500;
const SHIPPING_FEE = 50;

export interface OrderTotals {
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export const calculateTotals = (items: CartItem[]): OrderTotals => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping =
    subtotal === 0 || subtotal > FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
  const tax = Math.round(subtotal * TAX_RATE);
  return {
    itemCount: items.reduce((n, i) => n + i.quantity, 0),
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
  };
};

export const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

//*
export const MAX_ADDRESSES = 3;
// edit these lists to match the regions you ship to
export const COUNTRIES = ["India"];
export const STATES = ["Maharashtra"];
