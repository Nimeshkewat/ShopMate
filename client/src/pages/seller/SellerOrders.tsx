import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/api/apiClient";
import { useSellerOrders } from "@/hooks/seller/useSellerOrders";
import { useUpdateSellerOrderStatus } from "@/hooks/seller/useUpdateSellerOrderStatus";
import AppPagination from "@/components/common/AppPagination";
import type { Order } from "@/types/order";
import OrderCardSkeleton from "@/components/order/OrderCardSkeleton";
import { ORDER_FILTERS, type OrderFilter } from "@/utils/constants";
import type { NextOrderStatus } from "@/types/seller";
import { isApprovalError } from "@/components/seller/isApprovalError";
import ApprovalPending from "@/components/seller/ApprovalPending";
import SellerOrderCard from "@/components/seller/order/SellerOrderCard";

const LIMIT = 10;

function SellerOrders() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<OrderFilter>("All");
  const { data, isLoading, isError, error, refetch } = useSellerOrders({
    page,
    limit: LIMIT,
    ...(filter === "All" ? {} : { status: filter }),
  });
  const updateStatus = useUpdateSellerOrderStatus();

  if (isApprovalError(error)) return <ApprovalPending />;

  const orders = data?.sellerOrders ?? [];
  const pagination = data?.pagination;

  const handleStatusChange = (order: Order, orderStatus: NextOrderStatus) =>
    updateStatus.mutate(
      { id: order._id, orderStatus },
      {
        onSuccess: (res) =>
          toast.success(res?.message || `Order marked as ${orderStatus}`),
        // e.g. an online order that hasn't been paid yet can't be shipped
        onError: (err) => toast.error(getErrorMessage(err)),
      },
    );

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">All Orders</h1>
          <p className="text-sm text-muted-foreground">
            Manage all your orders.
          </p>
        </div>
        <select
          aria-label="Filter orders by status"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value as OrderFilter);
            setPage(1);
          }}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm sm:w-44"
        >
          {ORDER_FILTERS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </header>

      {isLoading ? (
        Array.from({ length: 2 }, (_, i) => <OrderCardSkeleton key={i} />)
      ) : isError ? (
        <p
          role="alert"
          className="flex items-center justify-center gap-3 py-10 text-destructive"
        >
          Couldn't load your orders.
          <button
            type="button"
            onClick={() => refetch()}
            className="font-medium underline"
          >
            Retry
          </button>
        </p>
      ) : orders.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          {filter === "All"
            ? "No orders yet. They'll show up here as customers buy your products."
            : `No ${filter.toLowerCase()} orders.`}
        </p>
      ) : (
        <>
          {orders.map((order) => (
            <SellerOrderCard
              key={order._id}
              order={order}
              onStatusChange={handleStatusChange}
              isUpdating={
                updateStatus.isPending &&
                updateStatus.variables?.id === order._id
              }
            />
          ))}
          <AppPagination
            pagination={pagination}
            page={page}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

export default SellerOrders;
