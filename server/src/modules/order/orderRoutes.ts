import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import { createOrder } from "./orderController.js";

const router = express.Router();

router.post("/", isAuthenticated, createOrder);

export default router;
