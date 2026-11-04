import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { validateResetPasswordToken } from "@/api/authApi";
import { getErrorMessage } from "@/api/apiClient";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";
import type { ResetPasswordValues } from "../schema/auth";

function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const [done, setDone] = useState(false);
  const resetPassword = useResetPassword();
  const tokenValidation = useQuery({
    queryKey: ["auth", "reset-password-token", token],
    queryFn: () => {
      if (!token) throw new Error("Reset token is required");
      return validateResetPasswordToken(token);
    },
    enabled: Boolean(token),
  });

  const handleSubmit = async (values: ResetPasswordValues) => {
    const res = await resetPassword.mutateAsync({
      token: token ?? "",
      ...values,
    });
    toast.success(res.message || "Password reset successfully");
    setDone(true);
  };

  if (!token || tokenValidation.isError) {
    return <Navigate to="/" replace />;
  }

  if (tokenValidation.isPending) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <p role="status" className="text-sm text-muted-foreground">
          Checking reset link...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border/60 sm:p-8">
        {done ? (
          <div className="space-y-4 text-center">
            <CircleCheck className="mx-auto size-12 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">Password updated</h1>
            <p className="text-sm text-muted-foreground">
              Your password has been reset. You can now sign in with your new
              password.
            </p>
            <Button className="h-10 w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">Reset Password</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose a new password for your account.
              </p>
            </div>
            <ResetPasswordForm
              onSubmit={handleSubmit}
              isPending={resetPassword.isPending}
              serverError={
                resetPassword.error
                  ? getErrorMessage(resetPassword.error)
                  : undefined
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
