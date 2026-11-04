import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ShippingInfo } from "../../types/shipping";

interface Props {
  address: ShippingInfo;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

function AddressCard({
  address,
  selected,
  onSelect,
  onDelete,
  isDeleting,
}: Props) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl p-4 transition-all ring-1",
        selected
          ?"bg-secondary/60 ring-primary shadow-sm"
          : "bg-card ring-border/60 hover:bg-secondary/30",
      )}
    >
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        onClick={onSelect}
        className="flex min-w-0 flex-1 cursor-pointer gap-3 text-left"
      >
        <span
          className={cn(
            "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border transition-colors",
            selected ? "border-primary bg-primary" : "border-border/80 bg-background",
          )}
        >
          {selected && (
            <span className="size-1.5 rounded-full bg-primary-foreground" />
          )}
        </span>
          <span className="min-w-0 space-y-0.5 text-xs">
            <span className="block text-sm font-semibold text-foreground">{address.fullname}</span>
            <span className="block text-muted-foreground">{address.phone}</span>
            <span className="block text-foreground">{address.address}</span>
            <span className="block text-muted-foreground">
              {address.city}, {address.state} {address.pincode}, {address.country}
            </span>
          </span>
      </button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        onClick={onDelete}
        disabled={isDeleting}
        aria-label={`Delete address for ${address.fullname}`}
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}

export default AddressCard;
