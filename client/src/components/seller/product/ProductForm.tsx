import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { CATEGORIES, CURRENCY } from "@/utils/constants";
import { productSchema, type ProductValues } from "@/schema/product";
import FormField from "./FormField";

const categoryNames = CATEGORIES.map((c) => c.name);
const inputClass = "h-10 bg-background/50";
const cardClass =
  "space-y-5 rounded-xl border border-primary/15 bg-primary/10 p-5 sm:p-6";

export interface ProductFormProps {
  defaultValues?: Partial<ProductValues>;
  onSubmit: (values: ProductValues, images: File[]) => Promise<unknown>;
  isPending: boolean;
  isEdit?: boolean;
}

function ProductForm({
  defaultValues,
  onSubmit,
  isPending,
  isEdit = false,
}: ProductFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: defaultValues as ProductValues,
    mode: "onTouched",
  });

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const submit = async (values: ProductValues) => {
    try {
      await onSubmit(values, images);
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-6">
      <section className={cardClass}>
        <h2 className="text-lg font-semibold">Product details</h2>

        <FormField label="Name *" error={errors.name?.message}>
          <Input
            maxLength={50}
            aria-invalid={!!errors.name}
            className={inputClass}
            {...register("name")}
          />
        </FormField>

        <FormField label="Description *" error={errors.description?.message}>
          <Textarea
            maxLength={200}
            rows={3}
            aria-invalid={!!errors.description}
            className="resize-none bg-background/50"
            {...register("description")}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label={`Price (${CURRENCY}) *`}
            error={errors.price?.message}
          >
            <Input
              type="number"
              min={0}
              step="0.01"
              inputMode="decimal"
              aria-invalid={!!errors.price}
              className={inputClass}
              {...register("price")}
            />
          </FormField>

          <FormField label="Stock *" error={errors.stock?.message}>
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              aria-invalid={!!errors.stock}
              className={inputClass}
              {...register("stock")}
            />
          </FormField>
        </div>

        <FormField label="Category *" error={errors.category?.message}>
          <select
            aria-invalid={!!errors.category}
            className={cn(
              inputClass,
              "w-full rounded-md border border-input bg-background/50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50",
            )}
            {...register("category")}
          >
            <option value="">Select a category</option>
            {categoryNames.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormField>
      </section>

      {!isEdit && (
        <section className={cardClass}>
          <h2 className="text-lg font-semibold">Product images</h2>
          <p className="text-xs text-muted-foreground">
            Upload up to 4 images.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={handleImages}
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <Plus className="mr-2 size-4" />
            {images.length
              ? `${images.length} image(s) selected`
              : "Choose images"}
          </Button>

          {previews.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {previews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Preview ${i + 1}`}
                  className="aspect-square rounded-lg object-cover"
                />
              ))}
            </div>
          )}
        </section>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-12 w-full text-base"
      >
        {isPending ? (
          <>
            <Spinner size="sm" className="mr-2" />
            {isEdit ? "Saving..." : "Creating..."}
          </>
        ) : isEdit ? (
          "Save changes"
        ) : (
          "Create product"
        )}
      </Button>
    </form>
  );
}

export default ProductForm;
