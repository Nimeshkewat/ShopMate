import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Shop } from "@/types/seller";
import type { UpdateShopPayload } from "@/types/shop";
import { shopSettingsSchema, type ShopSettingsValues } from "@/schema/seller";
import FormField from "../product/FormField";
import ShopImageUpload from "./ShopImageUpload";

interface Props {
  shop: Shop;
  onSubmit: (payload: UpdateShopPayload) => Promise<unknown>;
  isPending?: boolean;
  serverError?: string;
}

function ShopSettingsForm({ shop, onSubmit, isPending, serverError }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [removeCurrent, setRemoveCurrent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ShopSettingsValues>({
    resolver: zodResolver(shopSettingsSchema),
    mode: "onTouched",
    defaultValues: {
      shopName: shop.shopName,
      description: shop.shopDescription ?? "",
    },
  });

  const hasChanges = isDirty || !!image || removeCurrent;

  const submit = async (values: ShopSettingsValues) => {
    try {
      await onSubmit({
        shopName: values.shopName,
        shopDescription: values.description,
        shopImage: image,
        removeShopImage: removeCurrent,
      });

      reset(values);
      setImage(null);
      setRemoveCurrent(false);
    } catch {}
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      noValidate
      className="space-y-5 rounded-2xl border bg-card p-5 shadow-sm sm:p-6"
    >
      <FormField label="Shop name *" error={errors.shopName?.message}>
        <Input
          maxLength={50}
          aria-invalid={!!errors.shopName}
          className="h-10 bg-background/50"
          {...register("shopName")}
        />
      </FormField>

      <ShopImageUpload
        file={image}
        onChange={setImage}
        currentImage={shop.shopImage}
        removeCurrent={removeCurrent}
        onRemoveCurrentChange={setRemoveCurrent}
      />

      <FormField label="Description" error={errors.description?.message}>
        <Textarea
          maxLength={300}
          aria-invalid={!!errors.description}
          className="min-h-28 bg-background/50"
          {...register("description")}
        />
      </FormField>

      {serverError && (
        <p
          role="alert"
          className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {serverError}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={!hasChanges || isPending}
          onClick={() => {
            reset();
            setImage(null);
            setRemoveCurrent(false);
          }}
        >
          Discard changes
        </Button>
        <Button type="submit" disabled={!hasChanges || isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

export default ShopSettingsForm;
