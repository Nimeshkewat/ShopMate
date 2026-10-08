import express from "express";
import validate from "../../middlewares/validate.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./authSchema.js";
import {
  forgotPassword,
  login,
  logout,
  refresh,
  register,
  resetPassword,
} from "./authController.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post(
  "/reest-password/:token",
  validate(resetPasswordSchema),
  resetPassword
);

export default router;
