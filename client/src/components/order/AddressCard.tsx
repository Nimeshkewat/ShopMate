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
        "flex items-start gap-2 rounded-xl border p-4 transition-colors",
        selected
          ? "border-primary bg-primary/10 ring-1 ring-primary"
          : "border-primary/15 hover:bg-primary/5",
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
            "mt-1 grid size-4 shrink-0 place-items-center rounded-full border",
            selected ? "border-primary bg-primary" : "border-muted-foreground",
          )}
        >
          {selected && (
            <span className="size-1.5 rounded-full bg-primary-foreground" />
          )}
        </span>
        <span className="min-w-0 space-y-0.5 text-sm">
          <span className="block font-semibold">{address.fullname}</span>
          <span className="block text-muted-foreground">{address.phone}</span>
          <span className="block">{address.address}</span>
          <span className="block text-muted-foreground">
            {address.city}, {address.state} {address.pincode}, {address.country}
          </span>
        </span>
      </button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={onDelete}
        disabled={isDeleting}
        aria-label={`Delete address for ${address.fullname}`}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}

export default AddressCard;
