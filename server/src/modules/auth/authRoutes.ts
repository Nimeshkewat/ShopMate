import express from "express";
import validate from "../../middlewares/validate.js";
import {
  forgorPasswordSchema,
  loginSchema,
  registerSchema,
} from "./authSchema.js";
import {
  forgotPassword,
  login,
  logout,
  refresh,
  register,
} from "./authController.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/forgot-password", validate(forgorPasswordSchema), forgotPassword);

export default router;
