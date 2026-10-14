import { forwardRef, useId, useState, type ComponentProps } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props extends Omit<ComponentProps<"input">, "ref"> {
  icon: LucideIcon;
  error?: string;
}

const AuthInput = forwardRef<HTMLInputElement, Props>(function AuthInput(
  { icon: Icon, type, error, className, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);
  const errorId = useId();
  const isPassword = type === "password";

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          {...props}
          ref={ref}
          type={isPassword && visible ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-12 bg-background/50 pl-10",
            isPassword && "pr-11",
            error && "border-destructive focus-visible:ring-destructive/30",
            className,
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {visible ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="px-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
});

export default AuthInput;
