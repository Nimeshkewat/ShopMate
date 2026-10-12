import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import {
  createOrder,
  fetchOrderDetail,
  fetchOrders,
} from "./orderController.js";

const router = express.Router();

router.post("/", isAuthenticated, createOrder);
router.get("/", isAuthenticated, fetchOrders);
router.get("/:id", isAuthenticated, fetchOrderDetail);

export default router;
