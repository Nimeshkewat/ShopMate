import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/api/apiClient";
import ConfirmDialog from "@/components/admin/seller/ConfirmDialog";
import AppPagination from "@/components/common/AppPagination";
import { useBlockUser } from "@/hooks/admin/user-management/useBlockUser";
import { useUnblockUser } from "@/hooks/admin/user-management/useUnblockUser";
import { useUsers } from "@/hooks/admin/user-management/useUsers";
import type { User } from "@/types/user";
import UserDetailSheet from "@/components/admin/user/UserDetailSheet";
import UsersTable from "@/components/admin/user/UsersTable";

const LIMIT = 10;

function UserManagement() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useUsers({
    page,
    limit: LIMIT,
  });
  const blockUser = useBlockUser();
  const unblockUser = useUnblockUser();
  const [viewId, setViewId] = useState<string | null>(null);
  const [target, setTarget] = useState<User | null>(null);

  const users = data?.users ?? [];
  const total = data?.pagination.total ?? 0;

  const isUnblock = target?.isBlocked ?? false;
  const action = isUnblock ? unblockUser : blockUser;

  const handleConfirm = () => {
    if (!target) return;
    action.mutate(target._id, {
      onSuccess: (res) => {
        toast.success(
          res?.message || (isUnblock ? "User unblocked" : "User blocked"),
        );
        setTarget(null);
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">User Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all your website's users.
          </p>
        </div>
        {!isLoading && total > 0 && (
          <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary">
            {total} {total === 1 ? "user" : "users"}
          </span>
        )}
      </header>

      {isLoading ? (
        <div
          className="animate-pulse space-y-2 rounded-xl bg-card p-4 ring-1 ring-border/60"
          aria-hidden
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-12 rounded-lg bg-muted" />
          ))}
        </div>
      ) : isError ? (
        <p
          role="alert"
          className="flex items-center justify-center gap-3 py-16 text-destructive"
        >
          Couldn't load users.
          <button
            type="button"
            onClick={() => refetch()}
            className="font-medium underline"
          >
            Retry
          </button>
        </p>
      ) : users.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No users found.
        </p>
      ) : (
        <>
          <UsersTable
            users={users}
            onView={(user) => setViewId(user._id)}
            onToggleBlock={setTarget}
          />
          <AppPagination page={page} onPageChange={setPage} />
        </>
      )}

      <UserDetailSheet
        userId={viewId}
        onOpenChange={(open) => !open && setViewId(null)}
        onToggleBlock={setTarget}
      />

      <ConfirmDialog
        open={!!target}
        onOpenChange={(open) => !open && setTarget(null)}
        title={`${isUnblock ? "Unblock" : "Block"} ${target?.username ?? "this user"}?`}
        description={
          isUnblock
            ? "They will be able to sign in and use their account again."
            : "They will be signed out and won't be able to use their account until you unblock them."
        }
        confirmLabel={isUnblock ? "Unblock" : "Block"}
        destructive={!isUnblock}
        isPending={action.isPending}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default UserManagement;
