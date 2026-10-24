import { api } from "@/api/apiClient";
import type { OrderStatus } from "@/types/order";

export interface SellerDashboardStats {
  todayRevenue: number;
  revenueChangePct: number | null; // today vs yesterday, null if there was no revenue yesterday
  totalCustomers: number;
  allTimeRevenue: number;
  monthlySales: { month: string; sales: number }[];
  orderStatus: { status: OrderStatus; count: number }[];
  topProducts: {
    productId: string;
    name: string;
    image?: string;
    category: string;
    totalSold: number;
    rating: number;
  }[];
  summary: {
    salesThisMonth: number;
    ordersThisMonth: number;
    revenueGrowthPct: number | null; // this month vs last month
    lowStockCount: number;
    newCustomersThisMonth: number;
  };
}

export interface SellerDashboardResponse {
  success: boolean;
  stats: SellerDashboardStats;
}

// adjust to the route you add on the backend
export const fetchSellerDashboard = () =>
  api.get<SellerDashboardResponse>("/seller/dashboard").then((res) => res.data);
