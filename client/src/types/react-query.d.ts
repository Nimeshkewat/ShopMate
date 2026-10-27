import type { ApiError } from "@/api/apiError";
import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError;
  }
}
