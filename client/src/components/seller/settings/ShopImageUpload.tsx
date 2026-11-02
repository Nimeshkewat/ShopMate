import { useRef, useState, type ChangeEvent } from "react";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_SIZE_MB = 2;

interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
  currentImage?: string;
  removeCurrent?: boolean;
  onRemoveCurrentChange?: (remove: boolean) => void;
}

function ShopImageUpload({
  file,
  onChange,
  currentImage,
  removeCurrent,
  onRemoveCurrentChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>();
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    e.target.value = ""; // lets the same file be picked again
    if (!selected) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type))
      return setError("Please choose an image file.");
    if (selected.size > MAX_SIZE_MB * 1024 * 1024)
      return setError(`Image must be under ${MAX_SIZE_MB}MB.`);
    setError("");
    setPreview(URL.createObjectURL(selected));
    onChange(selected);
    onRemoveCurrentChange?.(false);
  };

  const savedImage = currentImage && !removeCurrent ? currentImage : undefined;
  const shown = preview ?? savedImage;
  const hasSomethingToRemove = !!file || !!savedImage;

  const handleRemove = () => {
    setError("");
    setPreview(undefined);
    if (file) onChange(null);
    else onRemoveCurrentChange?.(true);
  };

  return (
    <div className="space-y-1.5">
      <span className="text-sm font-medium">Shop image (optional)</span>
      <div className="flex items-center gap-4">
        {shown ? (
          <img
            src={shown}
            alt="Shop preview"
            className="size-20 rounded-xl object-cover"
          />
        ) : (
          <span className="grid size-20 place-items-center rounded-xl border border-dashed border-primary/30 bg-primary/10 text-muted-foreground">
            <Store className="size-7" />
          </span>
        )}
        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            onChange={handleChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            {shown ? "Change image" : "Upload image"}
          </Button>
          {hasSomethingToRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
            >
              Remove
            </Button>
          )}
          {removeCurrent && !file && currentImage && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemoveCurrentChange?.(false)}
            >
              Undo remove
            </Button>
          )}
        </div>
      </div>
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          JPG, PNG, or WEBP, up to {MAX_SIZE_MB}MB. Shown on your shop page.
        </p>
      )}
    </div>
  );
}
export default ShopImageUpload;
