import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "../../schema/auth";
import AuthInput from "./AuthInput";

interface Props {
  onSubmit: (values: ResetPasswordValues) => Promise<unknown>;
  isPending?: boolean;
  serverError?: string;
}

export default function ResetPasswordForm({
  onSubmit,
  isPending,
  serverError,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
  });

  const submit = async (values: ResetPasswordValues) => {
    try {
      await onSubmit(values);
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
      <AuthInput
        icon={Lock}
        type="password"
        placeholder="New Password (min. 8 characters)"
        autoComplete="new-password"
        error={errors.newPassword?.message}
        {...register("newPassword")}
      />
      <AuthInput
        icon={Lock}
        type="password"
        placeholder="Confirm New Password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

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
        {isPending ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
