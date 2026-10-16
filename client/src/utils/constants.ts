// Static storefront config, not API data.
// Replace the placeholder image URLs with your own files in src/assets.
const img = (seed: string) => `https://picsum.photos/seed/${seed}/600/300`;

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

// Static hero slides, not API data.
// Replace the placeholder image URLs with your own files in src/assets.
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
