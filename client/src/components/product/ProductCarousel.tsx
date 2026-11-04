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
  "size-8 rounded-lg border-border/60 bg-card text-foreground shadow-sm hover:bg-secondary hover:text-foreground";

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
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h2>
          {isLoading && <Spinner size="xs" className="text-primary" />}
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className={arrowClass}
            onClick={() => scroll(-1)}
            aria-label={`Previous ${title}`}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={arrowClass}
            onClick={() => scroll(1)}
            aria-label={`Next ${title}`}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 pt-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
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
