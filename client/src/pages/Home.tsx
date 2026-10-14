import ProductCarousel from "@/components/product/ProductCarousel";
import { newArrivals, topRated } from "../mock/storeFront";
import CategoryGrid from "../components/product/CategoryGrid";
import HeroCarousel from "../components/home/HeroCarousel";

function Home() {
  // TODO: replace mock data with your product hooks, and pass onAddToCart to the carousels
  return (
    <>
      <HeroCarousel />
      <CategoryGrid />
      <ProductCarousel title="New Arrivals" products={newArrivals} />
      <ProductCarousel title="Top Rated Products" products={topRated} />
    </>
  );
}

export default Home;
