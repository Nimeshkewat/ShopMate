import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/user";

const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

const roleStyles: Record<UserRole, string> = {
  admin:
    "bg-violet-500/12 text-violet-700 ring-1 ring-violet-500/20 dark:text-violet-400 dark:bg-violet-500/15 dark:ring-violet-500/25",
  seller:
    "bg-indigo-500/12 text-indigo-700 ring-1 ring-indigo-500/20 dark:text-indigo-400 dark:bg-indigo-500/15 dark:ring-indigo-500/25",
  user: "bg-secondary text-muted-foreground ring-1 ring-border/50",
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
          ? "bg-red-500/12 text-red-700 ring-1 ring-red-500/20 dark:text-red-400 dark:bg-red-500/15 dark:ring-red-500/25"
          : "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-500/15 dark:ring-emerald-500/25",
      )}
    >
      {blocked ? "Blocked" : "Active"}
    </span>
  );
}
