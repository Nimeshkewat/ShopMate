import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";
import { useSignup } from "@/hooks/auth/useSignup";
import { toast } from "sonner";
import { useLogin } from "@/hooks/auth/useLogin";
import { useQueryClient } from "@tanstack/react-query";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import type { SignupValues, LoginValues } from "@/schema/auth";

type Mode = "login" | "signup" | "forgot";

const copy: Record<Mode, { title: string; description: string }> = {
  login: { title: "Sign In", description: "Sign in to your ShopMate account." },
  signup: {
    title: "Create Account",
    description: "Create a ShopMate account.",
  },
  forgot: {
    title: "Forgot Password",
    description:
      "Enter your email and we'll send you a link to reset your password.",
  },
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AuthDialog({ open, onOpenChange }: Props) {
  const [mode, setMode] = useState<Mode>("login");
  const [sentTo, setSentTo] = useState("");
  const { mutate: signup, isPending: isSignupPending } = useSignup();
  const { mutate: login, isPending: isLoginPending } = useLogin();
  const { mutate: forgotPassword, isPending: isForgotPending } =
    useForgotPassword();
  const queryClient = useQueryClient();

  const handleSignup = (values: SignupValues) => {
    signup(values, {
      onSuccess: (data) => {
        onOpenChange(false);
        toast.success(data.message || "Account Created");
      },
      onError: (error) => {
        toast.error(error.response?.data.message || "Internel Server Error");
      },
    });
  };

  const handleLogin = (values: LoginValues) => {
    login(values, {
      onSuccess: async (data) => {
        onOpenChange(false);
        toast.success(data.message || "Logged In Successfully");
        await queryClient.invalidateQueries();
      },
      onError: (error) => {
        toast.error(error.response?.data.message || "Internel Server Error");
      },
    });
  };

  const handleForgot = (email: string) => {
    forgotPassword(
      { email },
      {
        onSuccess: (data) => {
          toast.success(
            data.message || "Forgot password link sent to your email",
          );
          setSentTo("success");
        },
        onError: (error) => {
          toast.error(error.response?.data.message || "Internal Server Error");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 border-border/60 bg-card p-6 shadow-xl sm:max-w-md [&>button]:right-4 [&>button]:top-4 [&>button]:rounded-lg [&>button]:bg-secondary [&>button]:p-1.5 [&>button]:text-muted-foreground">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {copy[mode].title}
          </DialogTitle>
          <DialogDescription
            className={
              mode === "forgot" ? "text-sm text-muted-foreground" : "sr-only"
            }
          >
            {copy[mode].description}
          </DialogDescription>
        </DialogHeader>

        {mode === "login" && (
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={() => setMode("forgot")}
            onSwitchToSignup={() => setMode("signup")}
            isPending={isLoginPending}
          />
        )}
        {mode === "signup" && (
          <SignupForm
            onSubmit={handleSignup}
            onSwitchToLogin={() => setMode("login")}
            isPending={isSignupPending}
          />
        )}
        {mode === "forgot" && (
          <ForgotPasswordForm
            sentTo={sentTo}
            onSubmit={handleForgot}
            isPending={isForgotPending}
            onBackToLogin={() => setMode("login")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
