import { useState, type ChangeEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
  const [avatarPreview, setAvatarPreview] = useState<string>("");

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
    logout(undefined, {
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
        className="flex w-full flex-col gap-0 overflow-y-auto border-l border-border/60 bg-card p-0 shadow-xl sm:max-w-sm [&>button]:right-4 [&>button]:top-4 [&>button]:rounded-lg [&>button]:bg-secondary [&>button]:p-1.5 [&>button]:text-muted-foreground"
      >
          <SheetHeader className="border-b border-border/60 p-5">
            <SheetTitle className="text-base font-semibold text-foreground">Profile</SheetTitle>
            <SheetDescription className="sr-only">
              Manage your account
            </SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-muted-foreground">
              <Spinner size="lg" className="text-primary" />
              <p className="text-xs">Loading profile...</p>
            </div>
          ) : (
                <div className="space-y-6 p-5">
                  <div className="flex flex-col items-center text-center">
                    {avatarPreview || data?.user.avatar ? (
                      <div className="relative group">
                        <img
                          src={avatarPreview || data?.user.avatar}
                          alt={data?.user.username}
                          className="size-16 rounded-full object-cover ring-2 ring-border"
                        />
                        {avatarPreview && (
                          <X
                            size={16}
                            onClick={() => {
                              setAvatarFile(null);
                              setAvatarPreview("");
                            }}
                            className="absolute hidden inset-0 group-hover:bg-black/50 text-white group-hover:grid place-items-center cursor-pointer rounded-full size-full"
                          />
                        )}
                      </div>
                    ) : (
                        <div className="grid size-16 place-items-center rounded-full bg-primary text-xl font-bold text-primary-foreground ring-2 ring-primary/20">
                          {data?.user.username.charAt(0).toUpperCase()}
                        </div>
              )}
                          <p className="mt-2 text-sm font-semibold text-foreground">
                            {data?.user.username}
                          </p>
                            <p className="text-xs text-muted-foreground">
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
                            loading={isLoggingOut}
                            loadingText="Logging out..."
                            className="h-10 w-full border-destructive/30 bg-destructive/5 text-xs font-semibold text-destructive hover:bg-destructive/15 hover:border-destructive/50"
                          >
                            <LogOut className="size-3.5" />
                            Logout
                          </Button>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
                );
}

                export default ProfileSheet;
