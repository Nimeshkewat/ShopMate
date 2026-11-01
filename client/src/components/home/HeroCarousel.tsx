import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: "Latest technology",
    title: "Electronics",
    subtitle: "Discover the newest gadgets and devices",
    cta: "Shop Electronics",
    category: "Electronics",
    gradient: "from-indigo-900/90 via-violet-900/70 to-background",
    accentGradient: "from-indigo-500/20 to-violet-500/10",
  },
  {
    id: 2,
    eyebrow: "New season styles",
    title: "Fashion",
    subtitle: "Trending looks for every occasion",
    cta: "Shop Fashion",
    category: "Fashion",
    gradient: "from-rose-900/90 via-pink-900/70 to-background",
    accentGradient: "from-rose-500/20 to-pink-500/10",
  },
  {
    id: 3,
    eyebrow: "Transform your space",
    title: "Home & Garden",
    subtitle: "Beautiful furniture and decor for every home",
    cta: "Shop Home",
    category: "Home & Garden",
    gradient: "from-emerald-900/90 via-teal-900/70 to-background",
    accentGradient: "from-emerald-500/20 to-teal-500/10",
  },
];

const AUTOPLAY_MS = 5000;

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const go = (direction: 1 | -1) =>
    setIndex((i) => (i + direction + count) % count);

  return (
    <section
      className="relative h-[58vh] max-h-[640px] min-h-[380px] w-full overflow-hidden rounded-b-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
          {/* Gradient background */}
          <div
            className={cn("absolute inset-0 bg-gradient-to-br", slide.gradient)}
          />
          {/* Soft radial glow */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-60",
              slide.accentGradient,
            )}
          />

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
        { dir: -1 as const, pos: "left-3 sm:left-5", label: "Previous slide", Icon: ChevronLeft },
        { dir: 1 as const, pos: "right-3 sm:right-5", label: "Next slide", Icon: ChevronRight },
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
