import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard, { type ProductCardData } from "./ProductCard";

interface Props {
  title: string;
  products: ProductCardData[];
  onAddToCart?: (product: ProductCardData) => void;
}

const arrowClass =
  "border-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground";

function ProductCarousel({ title, products, onAddToCart }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

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
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
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
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[72%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]"
          >
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductCarousel;
