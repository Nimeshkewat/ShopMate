import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/user/useProfile";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileFormProps {
  onHandle: (e: ChangeEvent<HTMLInputElement>) => void;
  avatarFile: File | null;
}

function ProfileForm({ onHandle, avatarFile }: ProfileFormProps) {
  const { data } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const queryClient = useQueryClient();

  const [username, setUsername] = useState(data?.user.username ?? "");
  const [email, setEmail] = useState(data?.user.email ?? "");

  //* snapshot of last saved values, used to detect real changes
  const [originalData, setOriginalData] = useState({
    username: data?.user.username || "",
    hasOrignalAvatar: data?.user.avatar ? true : false,
  });

  const hasChanges = username !== originalData.username || avatarFile !== null;
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    updateProfile(formData, {
      onSuccess: async (data) => {
        toast.success(data.message || "Profile Updated");
        setOriginalData((prev) => ({ ...prev, username }));
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
      },
      onError: (error) => {
        toast.error(error.response?.data.message || "Internal Server Error");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="text-lg font-semibold">Update Profile</h3>

      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Full name"
        aria-label="Full name"
        maxLength={50}
        required
        className="h-11 bg-background/50"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        required
        readOnly
        className="h-11 bg-background/50"
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onHandle}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex max-w-full items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <Upload className="size-4 shrink-0" />
        <span className="truncate">
          {avatarFile ? avatarFile.name : "Upload Avatar"}
        </span>
      </button>

      <Button
        type="submit"
        variant="outline"
        className="h-11 w-full border-primary/30 bg-primary/20 hover:bg-primary/30"
        disabled={isPending || !hasChanges}
      >
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}

export default ProfileForm;
