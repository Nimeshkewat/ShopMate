import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";
import { RoleBadge, UserStatusBadge } from "./UserBadges";
import UserAvatar from "./UserAvatar";

interface Props {
  users: User[];
  onView: (user: User) => void;
  onToggleBlock: (user: User) => void;
}

const headings = ["User", "Email", "Role", "Status", "Joined", "Actions"];

function UsersTable({ users, onView, onToggleBlock }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl bg-card shadow-sm ring-1 ring-border/60">
      <table className="w-full min-w-195 text-sm">
        <thead>
          <tr className="border-b border-border/60">
            {headings.map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {users.map((user) => {
            const isAdmin = user.role === "admin";
            return (
              <tr
                key={user._id}
                className="transition-colors hover:bg-secondary/40"
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} />
                    <span className="font-medium text-foreground">{user.username}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">
                  {user.email}
                </td>
                <td className="px-4 py-2.5">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-4 py-2.5">
                  <UserStatusBadge blocked={user.isBlocked} />
                </td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground tabular-nums">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => onView(user)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isAdmin}
                      title={
                        isAdmin ? "Admin accounts can't be blocked" : undefined
                      }
                      className={cn(
                        "h-7 text-xs",
                        !isAdmin &&
                          (user.isBlocked
                            ? "border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-emerald-400"
                            : "border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"),
                      )}
                      onClick={() => onToggleBlock(user)}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
