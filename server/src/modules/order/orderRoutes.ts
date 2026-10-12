import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import {
  cancelorder,
  createOrder,
  fetchOrderDetail,
  fetchOrders,
  fetchSellerOrders,
  updateOrderStatus,
} from "./orderController.js";
import isSeller from "../../middlewares/seller.js";

const router = express.Router();

//* User Routes
router.post("/", isAuthenticated, createOrder);
router.get("/", isAuthenticated, fetchOrders);
router.get("/:id", isAuthenticated, fetchOrderDetail);
router.patch("/:id/cancel", isAuthenticated, cancelorder);

//* Seller Routes
router.patch(
  "/seller/:id/status",
  isAuthenticated,
  isSeller,
  updateOrderStatus
);
router.get("/seller", isAuthenticated, isSeller, fetchSellerOrders);

export default router;
