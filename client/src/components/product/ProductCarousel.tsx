import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  title: string;
  products: Product[];
  isLoading?: boolean;
}

const arrowClass =
  "border-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground";

const slideClass =
  "w-[72%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]";

export default function ProductCarousel({ title, products, isLoading }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  // hide the whole section when there is nothing to show
  if (!isLoading && products.length === 0) return null;

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (el)
      el.scrollBy({
        left: direction * el.clientWidth * 0.9,
        behavior: "smooth",
      });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          {isLoading && <Spinner size="sm" className="text-primary" />}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={arrowClass}
            onClick={() => scroll(-1)}
            aria-label={`Previous ${title}`}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={arrowClass}
            onClick={() => scroll(1)}
            aria-label={`Next ${title}`}
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="-mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-6 pt-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => (
              <div key={i} className={slideClass}>
                <ProductCardSkeleton />
              </div>
            ))
          : products.map((product) => (
              <div key={product._id} className={slideClass}>
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </section>
  );
}
