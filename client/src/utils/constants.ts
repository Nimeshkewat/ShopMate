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
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  Shipped: {
    icon: Truck,
    className: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  },
  Delivered: {
    icon: CircleCheck,
    className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  Cancelled: {
    icon: CircleX,
    className: "bg-red-500/15 text-red-600 dark:text-red-400",
  },
};

export const CURRENCY = "₹";
