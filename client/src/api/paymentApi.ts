import { api } from "@/api/apiClient";
import type {
  RazorpayOrderPayload,
  RazorpayOrderResponse,
  VerifyPaymentPayload,
  VerifyPaymentResponse,
} from "../types/payment";

const BASE = "/payments";

export const createRazorpayOrder = (payload: RazorpayOrderPayload) =>
  api.post<RazorpayOrderResponse>(`${BASE}`, payload).then((res) => res.data);

export const verifyPayment = (payload: VerifyPaymentPayload) =>
  api
    .post<VerifyPaymentResponse>(`${BASE}/verify`, payload)
    .then((res) => res.data);
