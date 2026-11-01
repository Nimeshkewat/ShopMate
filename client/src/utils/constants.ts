const img = (seed: string) => `https://picsum.photos/seed/${seed}/600/300`;
import type { OrderStatus } from "@/types/order";
import {
  CircleCheck,
  CircleX,
  Package,
  Truck,
  type LucideIcon,
} from "lucide-react";

export const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Books",
  "Beauty",
  "Automotive",
  "Kids & Baby",
].map((name) => ({
  name,
  image: img(`category-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`),
}));

//* Order
export const ORDER_FILTERS = [
  "All",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;
export type OrderFilter = (typeof ORDER_FILTERS)[number];

export const STATUS_STYLES: Record<
  OrderStatus,
  { icon: LucideIcon; className: string }
> = {
  Processing: {
    icon: Package,
    className:
      "bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-400 dark:bg-amber-500/15 dark:ring-amber-500/25",
  },
  Shipped: {
    icon: Truck,
    className:
      "bg-blue-500/12 text-blue-700 ring-1 ring-blue-500/20 dark:text-blue-400 dark:bg-blue-500/15 dark:ring-blue-500/25",
  },
  Delivered: {
    icon: CircleCheck,
    className:
      "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-500/15 dark:ring-emerald-500/25",
  },
  Cancelled: {
    icon: CircleX,
    className:
      "bg-red-500/12 text-red-700 ring-1 ring-red-500/20 dark:text-red-400 dark:bg-red-500/15 dark:ring-red-500/25",
  },
};

export const CURRENCY = "₹";
