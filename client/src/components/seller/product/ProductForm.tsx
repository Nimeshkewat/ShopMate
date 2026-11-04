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
const inputClass = "h-10 bg-background text-sm ring-1 ring-border/60 focus-visible:ring-primary";
const cardClass =
  "space-y-4 rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60";

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
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
      {/* Basic info */}
      <section className={cardClass}>
        <h2 className="text-sm font-semibold text-foreground">Basic details</h2>

        <FormField label="Product title *" error={errors.name?.message}>
          <Input
            maxLength={100}
            aria-invalid={!!errors.name}
            className={inputClass}
            {...register("name")}
          />
        </FormField>

        <FormField
          label="Description *"
          error={errors.description?.message}
        >
          <Textarea
            maxLength={2000}
            aria-invalid={!!errors.description}
            className="min-h-24 bg-background text-sm ring-1 ring-border/60 focus-visible:ring-primary"
            {...register("description")}
          />
        </FormField>
      </section>

      {/* Pricing & inventory */}
      <section className={cardClass}>
        <h2 className="text-sm font-semibold text-foreground">Pricing & inventory</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label={`Price (${CURRENCY}) *`}
            error={errors.price?.message}
          >
            <Input
              type="number"
              step="0.01"
              min="0"
              aria-invalid={!!errors.price}
              className={inputClass}
              {...register("price", { valueAsNumber: true })}
            />
          </FormField>

          <FormField label="Stock quantity *" error={errors.stock?.message}>
            <Input
              type="number"
              step="1"
              min="0"
              aria-invalid={!!errors.stock}
              className={inputClass}
              {...register("stock", { valueAsNumber: true })}
            />
          </FormField>
        </div>

        <FormField label="Category *" error={errors.category?.message}>
          <select
            className={cn(
              inputClass,
              "w-full rounded-lg px-3 py-2 text-sm text-foreground",
            )}
            aria-invalid={!!errors.category}
            {...register("category")}
          >
            <option value="">Select a category</option>
            {categoryNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </FormField>
      </section>

      {/* Images - only on create */}
      {!isEdit && (
        <section className={cardClass}>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Product images</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Add up to 5 images. First image is the main display.
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImages}
            className="hidden"
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-10 border-dashed border-border/70 text-xs"
          >
            <Plus className="mr-2 size-3.5" />
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
                  className="aspect-square rounded-lg object-contain bg-secondary/40 p-1 ring-1 ring-border/50"
                />
              ))}
            </div>
          )}
        </section>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full text-sm font-semibold shadow-sm"
      >
        {isPending ? (
          <>
            <Spinner size="xs" className="mr-2" />
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
