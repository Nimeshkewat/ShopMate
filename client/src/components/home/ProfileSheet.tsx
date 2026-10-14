import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import ProfileForm from "./ProfileForm";
import { useProfile } from "@/hooks/user/useProfile";
import { useState, type ChangeEvent } from "react";
import { useLogout } from "@/hooks/auth/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ProfileSheet({ open, onOpenChange }: Props) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>();

  const { isAuthenticated } = useAuth();
  const { data, isLoading } = useProfile();
  const { mutate: logout, isPending } = useLogout();
  const queryClient = useQueryClient();
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
          <h1>Loading...</h1>
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

            {/* key remounts the form when the user changes, so fields stay in sync */}
            <ProfileForm
              key={data?.user._id}
              onHandle={handleFile}
              avatarFile={avatarFile}
            />
            {/* <PasswordForm
            onSubmit={(values) => mutate(values)}
            isPending={isPending}
            serverError={error?.message}
          /> */}

            <Button
              variant="outline"
              onClick={handleLogout}
              className="h-11 w-full border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive"
              disabled={isPending}
            >
              <LogOut className="size-4" />
              {isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default ProfileSheet;
