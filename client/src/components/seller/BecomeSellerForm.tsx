import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormField from "./FormField";
import type { BecomeSellerPayload } from "@/types/seller";
import { becomeSellerSchema, type BecomeSellerValues } from "@/schema/seller";
import ShopImageUpload from "./ShopImageUpload";

const cardClass =
  "space-y-5 rounded-xl border border-primary/15 bg-primary/10 p-5 sm:p-6";
const inputClass = "h-10 bg-background/50";

interface Props {
  onSubmit: (payload: BecomeSellerPayload) => Promise<unknown>;
  isPending?: boolean;
  serverError?: string;
}

function BecomeSellerForm({ onSubmit, isPending, serverError }: Props) {
  const [shopImage, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BecomeSellerValues>({
    resolver: zodResolver(becomeSellerSchema),
    mode: "onTouched",
  });

  const submit = async (values: BecomeSellerValues) => {
    try {
      await onSubmit({ ...values, shopImage });
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-6">
      <section className={cardClass}>
        <h2 className="text-lg font-semibold">Shop details</h2>

        <FormField label="Shop name *" error={errors.shopName?.message}>
          <Input
            maxLength={50}
            aria-invalid={!!errors.shopName}
            className={inputClass}
            {...register("shopName")}
          />
        </FormField>

        <ShopImageUpload file={shopImage} onChange={setImage} />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Business phone *"
            error={errors.businessPhone?.message}
          >
            <Input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel-national"
              aria-invalid={!!errors.businessPhone}
              className={inputClass}
              {...register("businessPhone")}
            />
          </FormField>
          <FormField label="Tax ID *" error={errors.taxId?.message}>
            <Input
              maxLength={20}
              autoComplete="off"
              aria-invalid={!!errors.taxId}
              className={inputClass}
              {...register("taxId")}
            />
          </FormField>
        </div>
      </section>

      <section className={cardClass}>
        <div>
          <h2 className="text-lg font-semibold">Payout details</h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="size-3.5" />
            Used only to pay out your earnings. Never shown publicly.
          </p>
        </div>

        <FormField label="Bank name *" error={errors.bankName?.message}>
          <Input
            maxLength={50}
            autoComplete="off"
            aria-invalid={!!errors.bankName}
            className={inputClass}
            {...register("bankName")}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Account number *"
            error={errors.accountNumber?.message}
          >
            <Input
              inputMode="numeric"
              maxLength={18}
              autoComplete="off"
              aria-invalid={!!errors.accountNumber}
              className={inputClass}
              {...register("accountNumber")}
            />
          </FormField>
          <FormField label="IFSC code *" error={errors.ifscCode?.message}>
            <Input
              maxLength={11}
              autoComplete="off"
              aria-invalid={!!errors.ifscCode}
              className={`${inputClass} uppercase`}
              {...register("ifscCode")}
            />
          </FormField>
        </div>
      </section>

      {serverError && (
        <p
          role="alert"
          className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-12 w-full text-base"
      >
        {isPending ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}

export default BecomeSellerForm;
