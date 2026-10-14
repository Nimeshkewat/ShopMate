// TEMPORARY mock data (placeholder images from picsum.photos).
// Delete this file once your modules/<name>/api + hooks supply real data.
import type { ProductCardData } from "@/components/product/ProductCard";
import type { CartItem } from "@/components/cart/CartSheet";

const img = (seed: string, w = 600, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const heroSlides = [
  {
    id: 1,
    eyebrow: "Latest technology",
    title: "Electronics",
    subtitle: "Discover the newest gadgets and devices",
    cta: "Shop Electronics",
    category: "Electronics",
    image: img("hero-electronics", 1600, 800),
  },
  {
    id: 2,
    eyebrow: "New season styles",
    title: "Fashion",
    subtitle: "Trending looks for every occasion",
    cta: "Shop Fashion",
    category: "Fashion",
    image: img("hero-fashion", 1600, 800),
  },
  {
    id: 3,
    eyebrow: "Transform your space",
    title: "Home & Garden",
    subtitle: "Beautiful furniture and decor for every home",
    cta: "Shop Home",
    category: "Home & Garden",
    image: img("hero-home", 1600, 800),
  },
];

export const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Books",
  "Beauty",
  "Automotive",
  "Kids & Baby",
].map((name) => ({ name, image: img(`category-${slug(name)}`, 600, 300) }));

const seeds: Omit<ProductCardData, "image">[] = [
  {
    id: "p1",
    name: "Sony WH-1000XM5 Headphones",
    price: 272.08,
    rating: 4.8,
    reviewCount: 12,
    stock: 7,
    isNew: true,
  },
  {
    id: "p2",
    name: "NVIDIA RTX 4080 GPU",
    price: 1024.73,
    rating: 5,
    reviewCount: 1,
    stock: 4,
    isNew: true,
  },
  {
    id: "p3",
    name: "iPhone 15 Pro Max (256GB)",
    price: 1448.76,
    rating: 3,
    reviewCount: 1,
    stock: 9,
    isNew: true,
  },
  {
    id: "p4",
    name: "AMD RX 7900 XTX GPU",
    price: 1060.07,
    rating: 5,
    reviewCount: 1,
    stock: 2,
    isNew: true,
  },
  {
    id: "p5",
    name: "Maybelline SuperStay Lipstick",
    price: 11.66,
    rating: 4,
    reviewCount: 1,
    stock: 3,
    isNew: true,
  },
  {
    id: "p6",
    name: "Baby Stroller (Foldable, Lightweight)",
    price: 222.61,
    rating: 5,
    reviewCount: 1,
    stock: 7,
    isNew: true,
  },
  {
    id: "p7",
    name: "Stuffed Teddy Bear (Large, 24 inch)",
    price: 42.4,
    rating: 5,
    reviewCount: 1,
    stock: 1,
    isNew: true,
  },
  {
    id: "p8",
    name: "Samsung Galaxy S23 Ultra (256GB)",
    price: 1448.76,
    rating: 4.5,
    reviewCount: 2,
    stock: 10,
    isNew: true,
  },
  {
    id: "p9",
    name: "LEGO Classic Building Blocks Set (500 pcs)",
    price: 44.17,
    rating: 3,
    reviewCount: 1,
    stock: 3,
    isNew: true,
  },
  {
    id: "p10",
    name: "Michelin Pilot Sport 4 Car Tire (245/40 R18)",
    price: 229.68,
    rating: 5,
    reviewCount: 1,
    stock: 2,
    isNew: true,
  },
];

export const products: ProductCardData[] = seeds.map((p) => ({
  ...p,
  image: img(slug(p.name)),
}));

export const newArrivals = products.slice(0, 8);
export const topRated = products.filter((p) => p.rating >= 4.5);

export const mockCartItems: CartItem[] = products.slice(6, 7).map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  image: p.image,
  quantity: 1,
}));
