import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { COUNTRIES, STATES } from "../../utils/index";
import { shippingSchema, type ShippingValues } from "../../schema/shipping";

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background/50 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">{label} *</span>
        {children}
      </label>
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

interface Props {
  onSubmit: (values: ShippingValues) => Promise<unknown>;
  onCancel?: () => void;
  isPending?: boolean;
  serverError?: string;
  submitLabel?: string;
}

function AddressForm({
  onSubmit,
  onCancel,
  isPending,
  serverError,
  submitLabel = "Save Address",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingValues>({
    resolver: zodResolver(shippingSchema),
    mode: "onTouched",
    defaultValues: { state: STATES[0], country: COUNTRIES[0] },
  });

  const submit = async (values: ShippingValues) => {
    try {
      await onSubmit(values);
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
      <Field label="Full Name" error={errors.fullname?.message}>
        <Input
          autoComplete="name"
          aria-invalid={!!errors.fullname}
          className="h-10 bg-background/50"
          {...register("fullname")}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="State" error={errors.state?.message}>
          <select className={selectClass} {...register("state")}>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <Input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel-national"
            aria-invalid={!!errors.phone}
            className="h-10 bg-background/50"
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label="Address" error={errors.address?.message}>
        <Input
          autoComplete="street-address"
          aria-invalid={!!errors.address}
          className="h-10 bg-background/50"
          {...register("address")}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="City" error={errors.city?.message}>
          <Input
            autoComplete="address-level2"
            aria-invalid={!!errors.city}
            className="h-10 bg-background/50"
            {...register("city")}
          />
        </Field>
        <Field label="Pincode" error={errors.pincode?.message}>
          <Input
            autoComplete="postal-code"
            aria-invalid={!!errors.pincode}
            className="h-10 bg-background/50"
            {...register("pincode")}
          />
        </Field>
        <Field label="Country" error={errors.country?.message}>
          <select className={selectClass} {...register("country")}>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {serverError && (
        <p
          role="alert"
          className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {serverError}
        </p>
      )}

      <div className="flex gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            className="h-11"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="h-11 flex-1 text-base"
        >
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default AddressForm;
