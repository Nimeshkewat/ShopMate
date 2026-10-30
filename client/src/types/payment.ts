export type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";

export interface RazorpayOrderPayload {
  orderId: string;
}

export interface RazorpayOrderResponse {
  success: boolean;
  razorpayOrderId: string;
  amount: number; // in paise
  currency: string;
  keyId: string;
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
}
