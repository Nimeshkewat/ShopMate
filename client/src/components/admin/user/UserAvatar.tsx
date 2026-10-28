import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

interface Props {
  user: Pick<User, "username" | "avatar">;
  className?: string;
}

function UserAvatar({ user, className }: Props) {
  return user.avatar ? (
    <img
      src={user.avatar}
      alt=""
      className={cn("size-10 shrink-0 rounded-full object-cover", className)}
    />
  ) : (
    <span
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full bg-amber-400 font-semibold text-amber-950",
        className,
      )}
    >
      {user.username.charAt(0).toUpperCase()}
    </span>
  );
}

export default UserAvatar;
