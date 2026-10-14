import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginValues } from "../../schema/auth";
import AuthInput from "./AuthInput";

interface Props {
  onSubmit: (values: LoginValues) => void;
  onForgotPassword: () => void;
  onSwitchToSignup: () => void;
  isPending?: boolean;
  serverError?: string;
}

export default function LoginForm({
  onSubmit,
  onForgotPassword,
  onSwitchToSignup,
  isPending,
  serverError,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <AuthInput
        icon={Mail}
        type="email"
        placeholder="Email Address"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <AuthInput
        icon={Lock}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </button>
      </div>

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
        Sign In
      </Button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
