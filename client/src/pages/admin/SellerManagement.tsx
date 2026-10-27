import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/api/apiClient";
import ConfirmDialog from "@/components/admin/seller/ConfirmDialog";
import { useApproveSeller } from "@/hooks/admin/seller-management/useApproveSeller";
import { usePendingSellers } from "@/hooks/admin/seller-management/usePendingSellers";
import { useRejectSeller } from "@/hooks/admin/seller-management/useRejectSeller";
import type { PendingSeller } from "@/types/admin";
import SellerApplicationCard from "@/components/admin/seller/SellerApplicationCard";
import AppPagination from "@/components/common/AppPagination";

const LIMIT = 10;

function ApplicationSkeleton() {
  return (
    <div
      className="flex animate-pulse gap-4 rounded-2xl border bg-card p-6"
      aria-hidden
    >
      <div className="size-16 rounded-xl bg-muted" />
      <div className="flex-1 space-y-3">
        <div className="h-5 w-48 rounded bg-muted" />
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-4 w-full max-w-md rounded bg-muted" />
      </div>
    </div>
  );
}

function SellerManagement() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = usePendingSellers({
    page,
    limit: LIMIT,
  });
  const approveSeller = useApproveSeller();
  const rejectSeller = useRejectSeller();
  const [sellerToReject, setSellerToReject] = useState<PendingSeller | null>(
    null,
  );

  const sellers = data?.pendingSellers ?? [];
  const pagination = data?.pagination;
  const total = pagination?.total ?? 0;

  const handleApprove = (seller: PendingSeller) =>
    approveSeller.mutate(seller._id, {
      onSuccess: (res) =>
        toast.success(res?.message || `${seller.shopName} approved`),
      onError: (error) => toast.error(getErrorMessage(error)),
    });

  const handleReject = () => {
    if (!sellerToReject) return;
    rejectSeller.mutate(sellerToReject._id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Application rejected");
        setSellerToReject(null);
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  const busy = approveSeller.isPending || rejectSeller.isPending;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Seller Management</h1>
          <p className="text-sm text-muted-foreground">
            Review shops waiting for approval.
          </p>
        </div>
        {!isLoading && total > 0 && (
          <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            {total} pending
          </span>
        )}
      </header>

      {isLoading ? (
        Array.from({ length: 3 }, (_, i) => <ApplicationSkeleton key={i} />)
      ) : isError ? (
        <p
          role="alert"
          className="flex items-center justify-center gap-3 py-16 text-destructive"
        >
          Couldn't load seller applications.
          <button
            type="button"
            onClick={() => refetch()}
            className="font-medium underline"
          >
            Retry
          </button>
        </p>
      ) : sellers.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-20 text-center">
          <CircleCheck className="size-12 text-emerald-500" />
          <p className="font-medium">No pending applications</p>
          <p className="text-sm text-muted-foreground">
            New seller applications will show up here.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {sellers.map((seller) => (
              <SellerApplicationCard
                key={seller._id}
                seller={seller}
                onApprove={handleApprove}
                onReject={setSellerToReject}
                isApproving={
                  approveSeller.isPending &&
                  approveSeller.variables === seller._id
                }
                disabled={busy}
              />
            ))}
          </div>

          <AppPagination
            pagination={pagination}
            page={page}
            onPageChange={setPage}
          />
        </>
      )}

      <ConfirmDialog
        open={!!sellerToReject}
        onOpenChange={(open) => !open && setSellerToReject(null)}
        title="Reject this application?"
        description={`This rejects the application for "${sellerToReject?.shopName ?? ""}". The applicant can apply again later.`}
        confirmLabel="Reject"
        destructive
        isPending={rejectSeller.isPending}
        onConfirm={handleReject}
      />
    </div>
  );
}
export default SellerManagement;
