import type { ShippingInfo } from "@/types/shipping";

export type PaymentType = "Online" | "CashOnDelivery";
export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface OrderItem {
  productId: string;
  sellerId: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId: string;
  shippingInfoId: string | ShippingInfo;
  orderItems: OrderItem[];
  price: number;
  tax: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  shippingInfoId: string;
  paymentType: PaymentType;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  order: Order;
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
}

export interface OrderDetailResponse {
  success: boolean;
  order: Order;
}

export interface CancelOrderResponse {
  success: boolean;
  message: string;
  order: Order;
}
