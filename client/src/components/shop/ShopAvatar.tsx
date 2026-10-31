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
      className={cn("size-16 shrink-0 rounded-xl object-cover", className)}
    />
  ) : (
    <span
      className={cn(
        "grid size-16 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary",
        className,
      )}
    >
      <Store className="size-7" />
    </span>
  );
}

export default ShopAvatar;
