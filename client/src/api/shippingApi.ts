import { api } from "@/api/apiClient";
import type { ShippingValues } from "../schema/shipping";
import type {
  DeleteShippingResponse,
  RawShippingItemResponse,
  RawShippingListResponse,
  ShippingInfoResponse,
  ShippingInfosResponse,
} from "../types/shipping";

const BASE = "/shipping";

export const fetchShippingInfos = () =>
  api.get<RawShippingListResponse>(BASE).then(
    (res): ShippingInfosResponse => ({
      success: res.data.success,
      shippingInfos: res.data.shipping ?? [],
    }),
  );

export const addShippingInfo = (input: ShippingValues) =>
  api.post<RawShippingItemResponse>(BASE, input).then(
    (res): ShippingInfoResponse => ({
      success: res.data.success,
      message: res.data.message,
      shippingInfo: res.data.shipping,
    }),
  );

export const deleteShippingInfo = (id: string) =>
  api.delete<DeleteShippingResponse>(`${BASE}/${id}`).then((res) => res.data);
