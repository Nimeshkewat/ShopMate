// One place for query keys. Make sure these match the keys your existing
// cart and product hooks use, so invalidations refresh them.
export const queryKeys = {
  cart: ["cart"] as const,
  products: ["products"] as const,
  orders: ["orders"] as const,
  order: (id: string) => ["orders", id] as const,
  shipping: ["shipping"] as const,
};
