import { useMemo } from "react";
import ProductCarousel from "@/components/product/ProductCarousel";
import CategoryGrid from "../components/product/CategoryGrid";
import HeroCarousel from "../components/home/HeroCarousel";
import { useProducts } from "@/hooks/product/useProducts";

function Home() {
  const { data, isLoading } = useProducts();

  //* I will swap in dedicated hooks if my API has them in future
  const { newArrivals, topRated } = useMemo(() => {
    const products = data?.products ?? [];
    return {
      newArrivals: [...products]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 8),
      topRated: products.filter((p) => p.rating >= 4.5).slice(0, 8),
    };
  }, [data]);

  return (
    <>
      <HeroCarousel />
      <CategoryGrid />
      <ProductCarousel
        title="New Arrivals"
        products={newArrivals}
        isLoading={isLoading}
      />
      <ProductCarousel
        title="Top Rated Products"
        products={topRated}
        isLoading={isLoading}
      />
    </>
  );
}

export default Home;
