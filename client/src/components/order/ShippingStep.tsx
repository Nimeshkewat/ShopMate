import { useState } from "react";
import { MapPin, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/api/apiClient";
import { useAddShippingInfo } from "@/hooks/shipping/useAddShippingInfo";
import { useDeleteShippingInfo } from "@/hooks/shipping/useDeleteShippingInfo";
import type { ShippingInfo } from "@/types/shipping";
import AddressCard from "@/components/order/AddressCard";
import AddressForm from "@/components/order/AddressForm";
import { MAX_ADDRESSES } from "@/utils/index";
import type { ShippingValues } from "@/schema/shipping";

interface Props {
  addresses: ShippingInfo[];
  isLoading: boolean;
  isError?: boolean;
  onRetry?: () => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onContinue: () => void;
}

function ShippingStep({
  addresses,
  isLoading,
  isError,
  onRetry,
  selectedId,
  onSelect,
  onContinue,
}: Props) {
  const addShipping = useAddShippingInfo();
  const deleteShipping = useDeleteShippingInfo();
  const [adding, setAdding] = useState(false);

  const hasSaved = addresses.length > 0;
  const showForm = adding || !hasSaved;
  const canAdd = addresses.length < MAX_ADDRESSES;

  const handleAdd = async (values: ShippingValues) => {
    const wasEmpty = !hasSaved;
    const res = await addShipping.mutateAsync(values);
    toast.success("Address saved");
    const newId = res.shippingInfo?._id;
    if (newId) onSelect(newId);
    setAdding(false);
    if (wasEmpty && newId) onContinue();
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this address?")) return;
    deleteShipping.mutate(
      { id },
      {
        onSuccess: () => toast.success("Address deleted"),
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );
  };

  return (
    <section className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Shipping Information</h2>
        {hasSaved && (
          <span className="text-xs text-muted-foreground">
            {addresses.length}/{MAX_ADDRESSES} saved
          </span>
        )}
      </div>

      {isError && (
        <p
          role="alert"
          className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-destructive/20 bg-destructive/8 px-3 py-2 text-xs font-medium text-destructive"
        >
          Couldn't load your saved addresses.
          <button
            type="button"
            onClick={onRetry}
            className="shrink-0 underline"
          >
            Retry
          </button>
        </p>
      )}

      {isLoading ? (
        <p className="mt-5 text-sm text-muted-foreground">
          Loading your addresses...
        </p>
      ) : showForm ? (
        <div className="mt-5 space-y-5">
          {hasSaved && (
            <Button
              type="button"
              variant="outline"
              className="h-10 w-full justify-between border-border/60 text-xs"
              onClick={() => setAdding(false)}
            >
              <span className="flex items-center gap-2">
                <MapPin className="size-3.5" />
                Use a saved address
              </span>
              <span className="text-xs text-muted-foreground">
                {addresses.length} saved
              </span>
            </Button>
          )}
          <AddressForm
            onSubmit={handleAdd}
            isPending={addShipping.isPending}
            serverError={
              addShipping.error ? getErrorMessage(addShipping.error) : undefined
            }
            submitLabel={hasSaved ? "Save Address" : "Continue to Payment"}
          />
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          <p className="text-xs text-muted-foreground">
            Select where we should deliver your order.
          </p>

          <div
            role="radiogroup"
            aria-label="Saved addresses"
            className="space-y-2.5"
          >
            {addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                selected={address._id === selectedId}
                onSelect={() => onSelect(address._id)}
                onDelete={() => handleDelete(address._id)}
                isDeleting={deleteShipping.isPending}
              />
            ))}
          </div>

          {canAdd ? (
            <Button
              type="button"
              variant="outline"
              className="h-10 w-full border-dashed border-border/70 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setAdding(true)}
            >
              <Plus className="size-3.5" />
              Add new address
            </Button>
          ) : (
            <p className="text-[11px] text-muted-foreground">
              You can save up to {MAX_ADDRESSES} addresses. Delete one to add
              another.
            </p>
          )}

          <Button
            className="h-11 w-full text-sm font-semibold shadow-sm"
            disabled={!selectedId}
            onClick={onContinue}
          >
            Continue to Payment
          </Button>
        </div>
      )}
    </section>
  );
}

export default ShippingStep;
