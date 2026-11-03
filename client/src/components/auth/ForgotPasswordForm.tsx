import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "../../schema/auth";
import AuthInput from "./AuthInput";

interface Props {
  onSubmit: (email: string) => void;
  onBackToLogin: () => void;
  isPending?: boolean;
  serverError?: string;
  sentTo: string;
}

function ForgotPasswordForm({
  onSubmit,
  onBackToLogin,
  isPending,
  serverError,
  sentTo,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
  });

  const submit = ({ email }: ForgotPasswordValues) => {
    onSubmit(email);
  };

  if (sentTo) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          If an account exists for{" "}
          <span className="font-medium text-foreground">{sentTo}</span>, a
          password reset link is on its way. Check your inbox.
        </p>
        <Button
          type="button"
          onClick={onBackToLogin}
          className="h-12 w-full text-base"
        >
          Back to Sign in
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
      <AuthInput
        icon={Mail}
        type="email"
        placeholder="Email Address"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
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
        loading={isPending}
        loadingText="Sending Link..."
        className="h-12 w-full text-base"
      >
        Send Reset Link
      </Button>

      <p className="text-center text-sm">
        Remembered it?{" "}
        <button
          type="button"
          onClick={onBackToLogin}
          className="font-medium text-primary hover:underline"
        >
          Back to Sign in
        </button>
      </p>
    </form>
  );
}

export default ForgotPasswordForm;
