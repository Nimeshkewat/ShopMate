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
    <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
      <table className="w-full min-w-195 text-sm">
        <thead className="bg-primary/10 text-left">
          <tr>
            {headings.map((heading) => (
              <th key={heading} scope="col" className="px-4 py-3 font-semibold">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map((user) => {
            const isAdmin = user.role === "admin";
            return (
              <tr key={user._id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} />
                    <span className="font-medium">{user.username}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {user.email}
                </td>
                <td className="px-4 py-3">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-4 py-3">
                  <UserStatusBadge blocked={user.isBlocked} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
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
                        !isAdmin &&
                          (user.isBlocked
                            ? "border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600"
                            : "border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"),
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
