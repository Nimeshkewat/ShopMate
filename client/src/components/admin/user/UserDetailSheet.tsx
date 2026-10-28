import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUser } from "@/hooks/admin/user-management/useUser";
import type { User } from "@/types/user";
import { RoleBadge, UserStatusBadge } from "./UserBadges";
import UserAvatar from "./UserAvatar";

interface Props {
  userId: string | null;
  onOpenChange: (open: boolean) => void;
  onToggleBlock: (user: User) => void;
}

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleString() : "—";

function UserDetailSheet({ userId, onOpenChange, onToggleBlock }: Props) {
  const { data, isLoading, isError } = useUser(userId!);
  const user = data?.user;

  const rows = user
    ? [
        { label: "Joined", value: formatDate(user.createdAt) },
        { label: "Last updated", value: formatDate(user.updatedAt) },
        ...(user.shopId?.shopName
          ? [
              {
                label: "Shop",
                value: `${user.shopId.shopName}${user.shopId.isApproved === undefined ? "" : user.shopId.isApproved ? " (approved)" : " (pending approval)"}`,
              },
            ]
          : []),
        { label: "User ID", value: user._id },
      ]
    : [];

  return (
    <Sheet open={!!userId} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-y-auto p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b p-5">
          <SheetTitle>User details</SheetTitle>
          <SheetDescription className="sr-only">
            Account information for this user
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 p-5">
          {isLoading ? (
            <div className="animate-pulse space-y-4" aria-hidden>
              <div className="mx-auto size-20 rounded-full bg-muted" />
              <div className="mx-auto h-5 w-40 rounded bg-muted" />
              <div className="h-24 rounded-lg bg-muted" />
            </div>
          ) : isError || !user ? (
            <p role="alert" className="py-10 text-center text-destructive">
              Couldn't load this user.
            </p>
          ) : (
            <>
              <div className="flex flex-col items-center text-center">
                <UserAvatar user={user} className="size-20 text-3xl" />
                <p className="mt-3 text-lg font-semibold">{user.username}</p>
                <p className="break-all text-sm text-muted-foreground">
                  {user.email}
                </p>
                <div className="mt-3 flex gap-2">
                  <RoleBadge role={user.role} />
                  <UserStatusBadge blocked={user.isBlocked} />
                </div>
              </div>

              <dl className="mt-6 divide-y rounded-xl border">
                {rows.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 px-4 py-3 text-sm"
                  >
                    <dt className="shrink-0 text-muted-foreground">{label}</dt>
                    <dd className="break-all text-right font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>

        {user && (
          <div className="border-t p-5">
            <Button
              variant={user.isBlocked ? "default" : "destructive"}
              className="h-11 w-full"
              disabled={user.role === "admin"}
              onClick={() => onToggleBlock(user)}
            >
              {user.role === "admin"
                ? "Admin accounts can't be blocked"
                : user.isBlocked
                  ? "Unblock user"
                  : "Block user"}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default UserDetailSheet;
