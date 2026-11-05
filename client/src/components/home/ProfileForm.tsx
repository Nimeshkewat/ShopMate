import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/user/useProfile";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileFormProps {
  avatarFile: File | null;
  onUpdateSuccess: () => void;
}

interface ProfileFormValues {
  username: string;
  email: string;
}

function ProfileForm({ avatarFile, onUpdateSuccess }: ProfileFormProps) {
  const { data } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      username: data?.user.username ?? "",
      email: data?.user.email ?? "",
    },
  });

  const hasChanges = isDirty || avatarFile !== null;
  const submit = (values: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("username", values.username);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    updateProfile(formData, {
      onSuccess: async (data) => {
        toast.success(data.message || "Profile Updated");
        reset(values);
        onUpdateSuccess();
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
      },
      onError: (error) => {
        toast.error(error.response?.data.message || "Internal Server Error");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3">
      <h3 className="text-lg font-semibold">Update Profile</h3>

      <Input
        {...register("username", { required: true, maxLength: 50 })}
        placeholder="Full name"
        aria-label="Full name"
        maxLength={50}
        required
        className="h-11 bg-background/50"
      />
      <Input
        type="email"
        {...register("email")}
        placeholder="Email address"
        aria-label="Email address"
        readOnly
        className="h-11 bg-background/50 text-muted-foreground"
      />

      <Button
        type="submit"
        variant="outline"
        className="h-11 w-full border-primary/30 bg-primary/20 hover:bg-primary/30"
        loading={isPending}
        loadingText="Saving Changes..."
        disabled={!hasChanges}
      >
        Save Changes
      </Button>
    </form>
  );
}

export default ProfileForm;
