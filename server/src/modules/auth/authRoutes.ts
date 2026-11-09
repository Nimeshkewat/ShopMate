import express from "express";
import validate from "../../middlewares/validate.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerValidationSchema,
  resetPasswordSchema,
} from "./authSchema.js";
import {
  forgotPassword,
  login,
  logout,
  refresh,
  register,
  resetPassword,
  validateResetPasswordToken,
} from "./authController.js";
import {
  rateLimiter,
  RATE_LIMIT_WINDOWS,
} from "../../middlewares/rateLimiters.js";

const router = express.Router();

router.post(
  "/register",
  rateLimiter({
    windowMs: RATE_LIMIT_WINDOWS.oneHour,
    limit: 5,
    action: "registration",
  }),
  validate(registerValidationSchema),
  register
);
router.post(
  "/login",
  rateLimiter({
    windowMs: RATE_LIMIT_WINDOWS.fifteenMinutes,
    limit: 10,
    action: "login",
  }),
  validate(loginSchema),
  login
);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post(
  "/forgot-password",
  rateLimiter({
    windowMs: RATE_LIMIT_WINDOWS.fifteenMinutes,
    limit: 3,
    action: "password reset",
  }),
  validate(forgotPasswordSchema),
  forgotPassword
);
router.get(
  "/reset-password/:token",
  rateLimiter({
    windowMs: RATE_LIMIT_WINDOWS.fifteenMinutes,
    limit: 10,
    action: "reset token validation",
  }),
  validateResetPasswordToken
);
router.post(
  "/reset-password/:token",
  rateLimiter({
    windowMs: RATE_LIMIT_WINDOWS.fifteenMinutes,
    limit: 5,
    action: "password reset",
  }),
  validate(resetPasswordSchema),
  resetPassword
);

export default router;
