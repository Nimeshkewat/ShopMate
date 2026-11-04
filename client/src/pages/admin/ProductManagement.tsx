import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/api/apiClient";
import ConfirmDialog from "@/components/admin/seller/ConfirmDialog";
import { useAdminProducts } from "@/hooks/admin/product-management/useAdminProducts";
import { useDeleteAdminProduct } from "@/hooks/admin/product-management/useDeleteAdminProduct";
import type { AdminProduct } from "@/types/admin";
import AppPagination from "@/components/common/AppPagination";
import AdminProductsTable from "@/components/admin/product/AdminProductsTable";

const LIMIT = 10;
function ProductManagement() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useAdminProducts({
    page,
    limit: LIMIT,
  });
  const deleteProduct = useDeleteAdminProduct();
  const [target, setTarget] = useState<AdminProduct | null>(null);

  const products = data?.products ?? [];
  const total = data?.pagination.total ?? 0;

  const handleDelete = () => {
    if (!target) return;
    deleteProduct.mutate(target._id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Product deleted");
        setTarget(null);
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Product Moderation</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review listings and remove products that break your rules.
          </p>
        </div>
        {!isLoading && total > 0 && (
          <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary">
            {total} {total === 1 ? "product" : "products"}
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
          Couldn't load products.
          <button
            type="button"
            onClick={() => refetch()}
            className="font-medium underline"
          >
            Retry
          </button>
        </p>
      ) : products.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No products have been listed yet.
        </p>
      ) : (
        <>
          <AdminProductsTable products={products} onDelete={setTarget} />
          <AppPagination page={page} onPageChange={setPage} />
        </>
      )}

      <ConfirmDialog
        open={!!target}
        onOpenChange={(open) => !open && setTarget(null)}
        title="Delete this product?"
        description={`This permanently deletes "${target?.name ?? ""}" and its images. Orders that were already placed keep their saved details. This can't be undone.`}
        confirmLabel="Delete product"
        destructive
        isPending={deleteProduct.isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
export default ProductManagement;
