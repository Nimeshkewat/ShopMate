import type { ApiError } from "@/api/apiError";

// your isSeller middleware answers 403 until an admin approves the shop
export const isApprovalError = (error: ApiError | null | undefined) =>
  error?.response?.status === 403;
