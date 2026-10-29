import type { PaginationParams } from "@/types/pagination";

export const queryKeys = {
  adminPendingSeller: (params?: PaginationParams) =>
    params
      ? (["admin", "pending-seller", params] as const)
      : (["admin", "pending-seller"] as const),

  adminUsers: (params?: PaginationParams) =>
    params
      ? (["admin", "users", params] as const)
      : (["admin", "users"] as const),

  adminUser: (id?: string) =>
    id ? (["admin", "user", id] as const) : (["admin", "user"] as const),

  adminProducts: (params?: PaginationParams) =>
    params
      ? (["admin", "products", params] as const)
      : (["admin", "products"] as const),

  sellerOrders: ["seller", "orders"] as const,
  sellerDashboard: ["seller", "dashboard"] as const,
  profile: ["profile"] as const,
  cart: ["cart"] as const,
  products: ["products"] as const,
  orders: ["orders"] as const,
  order: (id: string) => ["orders", id] as const,
  shipping: ["shipping"] as const,
};
