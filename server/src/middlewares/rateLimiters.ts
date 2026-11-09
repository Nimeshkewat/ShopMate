import { rateLimit } from "express-rate-limit";

export const RATE_LIMIT_WINDOWS = {
  fifteenMinutes: 15 * 60 * 1000,
  oneHour: 60 * 60 * 1000,
} as const;

type RateLimiterOptions = {
  windowMs: number;
  limit: number;
  action: string;
};

const createLimiter = ({ windowMs, limit, action }: RateLimiterOptions) => {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: `Too many ${action} requests. Please try again later.`,
    },
  });
};

export const globalLimiter = createLimiter({
  windowMs: RATE_LIMIT_WINDOWS.fifteenMinutes,
  limit: 500,
  action: "API",
});

export const rateLimiter = createLimiter;
