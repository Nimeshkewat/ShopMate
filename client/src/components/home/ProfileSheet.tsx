import { useState, type ChangeEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getErrorMessage } from "@/api/apiClient";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/hooks/auth/useLogout";
import { useProfile } from "@/hooks/user/useProfile";
import { useUpdatePassword } from "@/hooks/user/useUpdatePassword";
import PasswordForm from "./PasswordForm";
import ProfileForm from "./ProfileForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ProfileSheet({ open, onOpenChange }: Props) {
  const { isAuthenticated } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>();

  const { data, isLoading } = useProfile();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const updatePassword = useUpdatePassword();
  const queryClient = useQueryClient();

  //* the early return must come after every hook, never before them
  if (!isAuthenticated) return null;

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleLogout = () => {
    logout(null, {
      onSuccess: async (data) => {
        toast.success(data.message || "Logged out successfully");
        await queryClient.invalidateQueries({});
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error.response?.data.message || "Internal Server Error");
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-y-auto border-l border-white/20 bg-background/40 p-0 backdrop-blur-xl sm:max-w-sm [&>button]:right-5 [&>button]:top-5 [&>button]:rounded-lg [&>button]:bg-primary/15 [&>button]:p-1.5 [&>button]:text-primary"
      >
        <SheetHeader className="border-b border-white/10 p-5">
          <SheetTitle className="text-xl">Profile</SheetTitle>
          <SheetDescription className="sr-only">
            Manage your account
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <p className="p-5 text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-8 p-5">
            <div className="flex flex-col items-center text-center">
              {avatarPreview || data?.user.avatar ? (
                <img
                  src={avatarPreview || data?.user.avatar}
                  alt={data?.user.username}
                  className="size-20 rounded-full object-cover"
                />
              ) : (
                <div className="grid size-20 place-items-center rounded-full bg-amber-400 text-3xl font-semibold text-amber-950">
                  {data?.user.username.charAt(0).toUpperCase()}
                </div>
              )}
              <p className="mt-3 text-lg font-semibold">
                {data?.user.username}
              </p>
              <p className="text-sm text-muted-foreground">
                {data?.user.email}
              </p>
            </div>

            <ProfileForm
              key={data?.user._id}
              onHandle={handleFile}
              avatarFile={avatarFile}
            />

            <PasswordForm
              onSubmit={async (values) => {
                const res = await updatePassword.mutateAsync(values);
                toast.success(res.message || "Password updated successfully");
              }}
              isPending={updatePassword.isPending}
              serverError={
                updatePassword.error
                  ? getErrorMessage(updatePassword.error)
                  : undefined
              }
            />

            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="h-11 w-full border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive"
            >
              <LogOut className="size-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default ProfileSheet;
