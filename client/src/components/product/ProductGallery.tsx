import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-[4/3] overflow-hidden rounded-xl border border-primary/15 bg-primary/10">
        {images.length > 0 ? (
          <img
            src={images[active]}
            alt={name}
            className="size-full object-contain p-4"
          />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground">
            <ImageOff className="size-10" />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-primary/10 transition",
                i === active
                  ? "border-foreground"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <img src={src} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
