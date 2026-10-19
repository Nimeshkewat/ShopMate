import { api } from "@/api/apiClient";
import type {
  CancelOrderResponse,
  CreateOrderPayload,
  CreateOrderResponse,
  OrderDetailResponse,
  OrdersResponse,
} from "../types/order";

const BASE = "/orders";

export const createOrder = (payload: CreateOrderPayload) =>
  api.post<CreateOrderResponse>(BASE, payload).then((res) => res.data);

export const fetchOrders = () =>
  api.get<OrdersResponse>(BASE).then((res) => res.data);

export const fetchOrderDetail = (id: string) =>
  api.get<OrderDetailResponse>(`${BASE}/${id}`).then((res) => res.data);

export const cancelOrder = (id: string) =>
  api
    .patch<CancelOrderResponse>(`${BASE}/${id}/cancel`)
    .then((res) => res.data);
