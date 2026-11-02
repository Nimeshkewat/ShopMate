import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import electronics from "@/assets/electronic.webp";
import book from "@/assets/book.webp";
import sport from "@/assets/sports.webp";
import fashion from "@/assets/fashion.webp";

const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: "Latest technology",
    title: "Electronics",
    subtitle: "Discover the newest gadgets and devices",
    cta: "Shop Electronics",
    category: "Electronics",
    image: electronics,
  },
  {
    id: 2,
    eyebrow: "New season styles",
    title: "Fashion",
    subtitle: "Trending looks for every occasion",
    cta: "Shop Fashion",
    category: "Fashion",
    image: fashion,
  },
  {
    id: 3,
    eyebrow: "Transform your space",
    title: "Books",
    subtitle: "Find your next great read from a world of stories",
    cta: "Shop Home",
    category: "Books",
    image: book,
  },
  {
    id: 4,
    eyebrow: "Fuel your passion",
    title: "Sports",
    subtitle:
      "Gear up with top-tier equipment and apparel built for peak performance",
    cta: "Shop Sports",
    category: "Sports",
    image: sport,
  },
];

const AUTOPLAY_MS = 5000;

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const count = HERO_SLIDES.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count]);

  const go = (direction: 1 | -1) =>
    setIndex((i) => (i + direction + count) % count);

  return (
    <section
      className="relative h-[58vh] max-h-160 min-h-95 w-full overflow-hidden rounded-b-3xl"
      aria-roledescription="carousel"
      aria-label="Featured categories"
    >
      {/* Subtle dot-grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          {/* Background image and contrast overlay */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-20 flex size-full flex-col items-center justify-center px-8 text-center sm:px-16">
            <p className="rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm sm:text-sm">
              {slide.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-3 max-w-md text-sm text-white/70 sm:text-base">
              {slide.subtitle}
            </p>
            <Button
              size="lg"
              className="mt-8 h-11 px-8 text-sm font-semibold shadow-lg shadow-primary/25"
            >
              <Link
                to={`/products?category=${encodeURIComponent(slide.category)}`}
              >
                {slide.cta}
              </Link>
            </Button>
          </div>
        </div>
      ))}

      {/* Arrow buttons */}
      {[
        {
          dir: -1 as const,
          pos: "left-3 sm:left-5",
          label: "Previous slide",
          Icon: ChevronLeft,
        },
        {
          dir: 1 as const,
          pos: "right-3 sm:right-5",
          label: "Next slide",
          Icon: ChevronRight,
        },
      ].map(({ dir, pos, label, Icon }) => (
        <Button
          key={label}
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-1/2 z-20 size-9 -translate-y-1/2 rounded-lg border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20",
            pos,
          )}
          onClick={() => go(dir)}
          aria-label={label}
        >
          <Icon className="size-4" />
        </Button>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index
                ? "w-6 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/60",
            )}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;
