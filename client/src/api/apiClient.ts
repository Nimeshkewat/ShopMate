import axios, {
  isAxiosError,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const REFRESH_URL = "/auth/refresh";
const AUTH_URLS = ["/auth/login", "/auth/register", REFRESH_URL];

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/v1",
  withCredentials: true,
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let onAuthFailure: (() => void) | null = null;
export const setAuthFailureHandler = (handler: (() => void) | null) => {
  onAuthFailure = handler;
};

let refreshPromise: Promise<unknown> | null = null;
const refreshSession = () => {
  if (!refreshPromise) {
    refreshPromise = api.post(REFRESH_URL).finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetriableConfig | undefined;
    const isAuthRequest = AUTH_URLS.some((url) => original?.url?.includes(url));

    if (
      error.response?.status !== 401 ||
      !original ||
      original._retry ||
      isAuthRequest
    ) {
      return Promise.reject(error);
    }

    original._retry = true;
    try {
      await refreshSession();
      return api(original);
    } catch (refreshError) {
      onAuthFailure?.();
      return Promise.reject(refreshError);
    }
  },
);

export const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
) => {
  if (isAxiosError(error))
    return error.response?.data?.message ?? error.message ?? fallback;
  return error instanceof Error ? error.message : fallback;
};
