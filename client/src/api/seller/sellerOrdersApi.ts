import { api } from "@/api/apiClient";
import type {
  SellerOrdersResponse,
  UpdateOrderStatusPayload,
  UpdateOrderStatusResponse,
} from "@/types/seller";

const BASE = "/seller/orders";

export const fetchSellerOrders = () =>
  api.get<SellerOrdersResponse>(BASE).then((res) => res.data);

export const updateSellerOrderStatus = ({
  id,
  orderStatus,
}: UpdateOrderStatusPayload) =>
  api
    .patch<UpdateOrderStatusResponse>(`${BASE}/${id}/status`, { orderStatus })
    .then((res) => res.data);
