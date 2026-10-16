import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  updatePasswordSchema,
  type UpdatePasswordValues,
} from "../../schema/user";

interface Props {
  onSubmit: (values: UpdatePasswordValues) => Promise<unknown>;
  isPending?: boolean;
  serverError?: string;
}

const FieldError = ({ children }: { children?: ReactNode }) =>
  children ? (
    <p role="alert" className="px-1 text-xs text-destructive">
      {children}
    </p>
  ) : null;

export default function PasswordForm({
  onSubmit,
  isPending,
  serverError,
}: Props) {
  const [show, setShow] = useState(false);
  const type = show ? "text" : "password";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onTouched",
  });

  const submit = async (values: UpdatePasswordValues) => {
    try {
      await onSubmit(values);
      reset();
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-3">
      <h3 className="text-lg font-semibold">Update Password</h3>

      <div className="space-y-1.5">
        <Input
          type={type}
          placeholder="Current Password"
          aria-label="Current password"
          autoComplete="current-password"
          aria-invalid={!!errors.oldPassword}
          className="h-11 bg-background/50"
          {...register("oldPassword")}
        />
        <FieldError>{errors.oldPassword?.message}</FieldError>
      </div>

      <div className="space-y-1.5">
        <Input
          type={type}
          placeholder="New Password"
          aria-label="New password"
          autoComplete="new-password"
          aria-invalid={!!errors.newPassword}
          className="h-11 bg-background/50"
          {...register("newPassword")}
        />
        <FieldError>{errors.newPassword?.message}</FieldError>
      </div>

      <div className="space-y-1.5">
        <Input
          type={type}
          placeholder="Confirm Password"
          aria-label="Confirm password"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          className="h-11 bg-background/50"
          {...register("confirmPassword")}
        />
        <FieldError>{errors.confirmPassword?.message}</FieldError>
      </div>

      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        {show ? "Hide Passwords" : "Show Passwords"}
      </button>

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
        variant="outline"
        loading={isPending}
        loadingText="Updating Password..."
        className="h-11 w-full border-primary/30 bg-primary/20 hover:bg-primary/30"
      >
        Update Password
      </Button>
    </form>
  );
}
