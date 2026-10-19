import { api } from "@/api/apiClient";
import type { ShippingValues } from "../schema/shipping";
import type {
  DeleteShippingResponse,
  ShippingInfo,
  ShippingInfoResponse,
  ShippingInfosResponse,
} from "../types/shipping";

const BASE = "/shipping";

interface RawShippingListResponse {
  success: boolean;
  shipping: ShippingInfo[];
}

interface RawShippingItemResponse {
  success: boolean;
  message?: string;
  shipping: ShippingInfo;
}

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
