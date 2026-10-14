import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signupSchema, type SignupValues } from "../../schema/auth";
import AuthInput from "./AuthInput";

interface Props {
  onSubmit: (values: SignupValues) => void;
  onSwitchToLogin: () => void;
  isPending?: boolean;
  serverError?: string;
}

function SignupForm({
  onSubmit,
  onSwitchToLogin,
  isPending,
  serverError,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <AuthInput
        icon={User}
        placeholder="Full Name"
        autoComplete="username"
        error={errors.username?.message}
        {...register("username")}
      />
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
        placeholder="Password (min. 8 characters)"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
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
        Create Account
      </Button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default SignupForm;
