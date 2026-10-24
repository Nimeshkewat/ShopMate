import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

function FormField({ label, error, hint, className, children }: Props) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">{label}</span>
        {children}
      </label>
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

export default FormField;
