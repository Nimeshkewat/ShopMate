import express from "express";
import validate from "../../middlewares/validate.js";
import { registerSchema } from "./authSchema.js";
import { register } from "./authController.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

export default router;
