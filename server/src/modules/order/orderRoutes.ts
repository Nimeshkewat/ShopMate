import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import {
  cancelorder,
  createOrder,
  fetchOrderDetail,
  fetchOrders,
} from "./orderController.js";

const router = express.Router();

router.post("/", isAuthenticated, createOrder);
router.get("/", isAuthenticated, fetchOrders);
router.get("/:id", isAuthenticated, fetchOrderDetail);
router.patch("/:id/cancel", isAuthenticated, cancelorder);

export default router;
