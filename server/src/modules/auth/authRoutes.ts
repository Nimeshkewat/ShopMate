import express from "express";
import validate from "../../middlewares/validate.js";
import { loginSchema, registerSchema } from "./authSchema.js";
import { login, logout, register } from "./authController.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

export default router;
