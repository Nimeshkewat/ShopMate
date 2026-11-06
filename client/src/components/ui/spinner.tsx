import type { HTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  label?: string;
}

const sizeClasses = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-8",
  xl: "size-12",
};

export function Spinner({
  size = "md",
  label,
  className,
  ...props
}: SpinnerProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <span role="status" aria-live="polite" className={className} {...props}>
        <Loader2
          className={cn("animate-spin text-current", sizeClasses[size])}
          aria-hidden="true"
        />
        {label && <span className="text-sm font-medium">{label}</span>}
        <span className="sr-only">{label || "Loading..."}</span>
      </span>
    </div>
  );
}

export interface PageLoaderProps {
  message?: string;
  className?: string;
}

export function PageLoader({
  message = "Loading...",
  className,
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex min-h-[50vh] w-full flex-col items-center justify-center gap-3 p-6 text-muted-foreground",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <Spinner size="lg" className="text-primary" />
      <p className="animate-pulse text-sm font-medium">{message}</p>
    </div>
  );
}
