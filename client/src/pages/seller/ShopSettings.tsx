import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "@/api/apiClient";
import ShopSettingsForm from "@/components/seller/settings/ShopSettingsForm";
import { useGetShop } from "@/hooks/shop/settings/useGetShop";
import { useUpdateShop } from "@/hooks/shop/settings/useUpdateShop";
import type { UpdateShopPayload } from "@/types/shop";

function ShopSettings() {
  const { data, isLoading, isError, refetch } = useGetShop();
  const updateShop = useUpdateShop();
  const shop = data?.shop;

  const handleSubmit = async (payload: UpdateShopPayload) => {
    const res = await updateShop.mutateAsync(payload);
    toast.success(res?.message || "Shop updated");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Shop Settings</h1>
        <p className="text-sm text-muted-foreground">
          Control how your shop appears to buyers.
        </p>
      </header>

      {isLoading ? (
        <div className="h-96 animate-pulse rounded-2xl bg-muted" aria-hidden />
      ) : isError || !shop ? (
        <p
          role="alert"
          className="flex items-center justify-center gap-3 py-16 text-destructive"
        >
          Couldn't load your shop.
          <button
            type="button"
            onClick={() => refetch()}
            className="font-medium underline"
          >
            Retry
          </button>
        </p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            {shop.isApproved ? (
              <>
                <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 font-medium text-emerald-600 dark:text-emerald-400">
                  Approved
                </span>
                <Link
                  to={`/shops/${shop._id}`}
                  className="font-medium text-primary hover:underline"
                >
                  View your public shop page
                </Link>
              </>
            ) : (
              <span className="rounded-md bg-amber-500/15 px-2.5 py-1 font-medium text-amber-600 dark:text-amber-400">
                Awaiting admin approval. Your shop becomes public once it's
                approved.
              </span>
            )}
          </div>

          <ShopSettingsForm
            key={shop._id}
            shop={shop}
            onSubmit={handleSubmit}
            isPending={updateShop.isPending}
            serverError={
              updateShop.error ? getErrorMessage(updateShop.error) : undefined
            }
          />
        </>
      )}
    </div>
  );
}
export default ShopSettings;
