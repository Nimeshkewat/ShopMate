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

const router = express.Router();

router.post("/register", validate(registerValidationSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.get("/reset-password/:token", validateResetPasswordToken);
router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword
);

export default router;
