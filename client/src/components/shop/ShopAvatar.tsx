import { Store } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  image?: string;
  name: string;
  className?: string;
}

function ShopAvatar({ image, name, className }: Props) {
  return image ? (
    <img
      src={image}
      alt={name}
      className={cn("size-14 shrink-0 rounded-xl object-cover ring-1 ring-border/50", className)}
    />
  ) : (
    <span
      className={cn(
        "grid size-14 shrink-0 place-items-center rounded-xl bg-secondary text-primary ring-1 ring-border/50",
        className,
      )}
    >
      <Store className="size-6" />
    </span>
  );
}

export default ShopAvatar;
