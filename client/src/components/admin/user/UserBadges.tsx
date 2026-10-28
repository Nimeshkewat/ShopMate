import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/user";

const base = "inline-block rounded-md px-2.5 py-1 text-xs font-medium";

const roleStyles: Record<UserRole, string> = {
  admin: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  seller: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  user: "bg-muted text-muted-foreground",
};

export function RoleBadge({ role }: { role: UserRole }) {
  return (
    <span className={cn(base, "capitalize", roleStyles[role])}>{role}</span>
  );
}

export function UserStatusBadge({ blocked }: { blocked: boolean }) {
  return (
    <span
      className={cn(
        base,
        blocked
          ? "bg-red-500/15 text-red-600 dark:text-red-400"
          : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      )}
    >
      {blocked ? "Blocked" : "Active"}
    </span>
  );
}
