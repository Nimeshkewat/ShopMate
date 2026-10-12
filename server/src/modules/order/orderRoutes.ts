import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import { createOrder, getMyOrders } from "./orderController.js";

const router = express.Router();

router.post("/", isAuthenticated, createOrder);
router.get("/", isAuthenticated, getMyOrders);

export default router;
