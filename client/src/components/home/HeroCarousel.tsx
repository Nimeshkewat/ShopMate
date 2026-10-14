import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { heroSlides } from "../../mock/storeFront";

const AUTOPLAY_MS = 5000;

const arrowClass =
  "absolute top-1/2 z-20 size-10 -translate-y-1/2 rounded-lg border border-primary/20 bg-primary/15 text-primary backdrop-blur hover:bg-primary hover:text-primary-foreground";

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const go = (direction: 1 | -1) =>
    setIndex((i) => (i + direction + count) % count);

  return (
    <section
      className="relative h-[60vh] max-h-172.5 min-h-105 w-full overflow-hidden rounded-b-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured categories"
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <img
            src={slide.image}
            alt=""
            className="size-full scale-110 object-cover blur-md"
          />
          <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />

          <div className="relative flex size-full flex-col items-center justify-center px-16 text-center">
            <p className="text-sm font-medium text-primary sm:text-base">
              {slide.eyebrow}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-3 max-w-md text-base text-primary sm:text-lg">
              {slide.subtitle}
            </p>
            <Button size="lg" className="mt-8 h-12 px-8 text-base">
              <Link
                to={`/products?category=${encodeURIComponent(slide.category)}`}
              >
                {slide.cta}
              </Link>
            </Button>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className={cn(arrowClass, "left-2 sm:left-5")}
        onClick={() => go(-1)}
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(arrowClass, "right-2 sm:right-5")}
        onClick={() => go(1)}
        aria-label="Next slide"
      >
        <ChevronRight className="size-5" />
      </Button>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "size-2.5 rounded-full transition-colors",
              i === index
                ? "bg-primary"
                : "bg-foreground/25 hover:bg-foreground/40",
            )}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;
