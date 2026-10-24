import { useRef, useState, type ChangeEvent } from "react";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_SIZE_MB = 2;
interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
}

function ShopImageUpload({ file, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>();
  const [error, setError] = useState<string>();

  // useEffect(() => {
  //   if (!file) {
  //     setPreview(undefined);
  //     return;
  //   }
  //   const url = URL.createObjectURL(file);
  //   setPreview(url);
  //   return () => URL.revokeObjectURL(url);
  // }, [file]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    e.target.value = ""; // lets the same file be picked again
    if (!selected) return;
    setPreview(URL.createObjectURL(selected));
    if (!selected.type.startsWith("image/"))
      return setError("Please choose an image file.");
    if (selected.size > MAX_SIZE_MB * 1024 * 1024)
      return setError(`Image must be under ${MAX_SIZE_MB}MB.`);
    setError(undefined);
    onChange(selected);
  };

  return (
    <div className="space-y-1.5">
      <span className="text-sm font-medium">Shop image (optional)</span>
      <div className="flex items-center gap-4">
        {preview ? (
          <img
            src={preview}
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
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            {file ? "Change image" : "Upload image"}
          </Button>
          {file && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange(null)}
            >
              Remove
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
          PNG or JPG, up to {MAX_SIZE_MB}MB. Shown on your shop page.
        </p>
      )}
    </div>
  );
}

export default ShopImageUpload;
