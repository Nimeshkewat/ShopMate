export const queryKeys = {
  adminPendingSeller: (params?: { page?: number; limit?: number }) =>
    params
      ? (["admin", "pending-seller", params] as const)
      : (["admin", "pending-seller"] as const),

  sellerOrders: ["seller", "orders"] as const,
  sellerDashboard: ["seller", "dashboard"] as const,
  profile: ["profile"] as const,
  cart: ["cart"] as const,
  products: ["products"] as const,
  orders: ["orders"] as const,
  order: (id: string) => ["orders", id] as const,
  shipping: ["shipping"] as const,
};
