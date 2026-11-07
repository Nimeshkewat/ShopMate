import { api } from "@/api/apiClient";
import type {
  SellerOrdersResponse,
  UpdateOrderStatusPayload,
  UpdateOrderStatusResponse,
} from "@/types/seller";
import type { PaginationParams } from "@/types/pagination";

const BASE = "/seller/orders";

export const fetchSellerOrders = (
  params?: PaginationParams & { status?: string },
) =>
  api
    .get<SellerOrdersResponse>(BASE, { params })
    .then((res) => res.data);

export const updateSellerOrderStatus = ({
  id,
  orderStatus,
}: UpdateOrderStatusPayload) =>
  api
    .patch<UpdateOrderStatusResponse>(`${BASE}/${id}/status`, { orderStatus })
    .then((res) => res.data);
