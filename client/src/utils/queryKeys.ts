export const queryKeys = {
  sellerOrders: ["seller", "orders"] as const,
  sellerDashboard: ["seller", "dashboard"] as const,
  profile: ["profile"] as const,
  cart: ["cart"] as const,
  products: ["products"] as const,
  orders: ["orders"] as const,
  order: (id: string) => ["orders", id] as const,
  shipping: ["shipping"] as const,
};
