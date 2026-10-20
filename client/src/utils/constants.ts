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

const HeroImg = (seed: string) => `https://picsum.photos/seed/${seed}/1600/800`;

export const heroSlides = [
  {
    id: 1,
    eyebrow: "Latest technology",
    title: "Electronics",
    subtitle: "Discover the newest gadgets and devices",
    cta: "Shop Electronics",
    category: "Electronics",
    image: HeroImg("hero-electronics"),
  },
  {
    id: 2,
    eyebrow: "New season styles",
    title: "Fashion",
    subtitle: "Trending looks for every occasion",
    cta: "Shop Fashion",
    category: "Fashion",
    image: HeroImg("hero-fashion"),
  },
  {
    id: 3,
    eyebrow: "Transform your space",
    title: "Home & Garden",
    subtitle: "Beautiful furniture and decor for every home",
    cta: "Shop Home",
    category: "Home & Garden",
    image: HeroImg("hero-home"),
  },
];

//* Ordee
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
