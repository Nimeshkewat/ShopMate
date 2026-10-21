import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/isAdmin.js";
import {
  approveSeller,
  getPendingSellers,
  rejectSeller,
} from "./controllers/sellerAdminController.js";
import {
  blockUser,
  getAllUsers,
  getUserById,
  unBlockUser,
} from "./controllers/userAdminController.js";
import { updateOrderStatus } from "../order/orderController.js";
import {
  deleteProduct,
  getAllProduct,
} from "./controllers/productAdminController.js";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus as updateOrderPaymentStatus,
} from "./controllers/orderAdminController.js";
import { getAdminDashboard } from "./controllers/dashboardAdminController.js";

const router = express.Router();

router.use(isAuthenticated, isAdmin);

//* Seller Management
router.get("/pending-sellers", getPendingSellers);
router.patch("/approve-seller/:id", approveSeller);
router.patch("/reject-seller/:id", rejectSeller);

//* User Management
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/block", blockUser);
router.patch("/users/:id/unblock", unBlockUser);
router.patch("/users/:id/update-status", updateOrderStatus);

//* Product Moderation
router.get("/products", getAllProduct);
router.delete("/products/:id", deleteProduct);

//* Order Oversight
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.patch("/orders/:id", updateOrderPaymentStatus);

//* Admin Dashboard
router.get("/dashboard", getAdminDashboard);

export default router;
