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

const router = express.Router();

//* Seller Management
router.get("/pending-sellers", isAuthenticated, isAdmin, getPendingSellers);
router.patch("/approve-seller", isAuthenticated, isAdmin, approveSeller);
router.patch("/reject-seller", isAuthenticated, isAdmin, rejectSeller);

//* User Management
router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.get("/users/:id", isAuthenticated, isAdmin, getUserById);
router.patch("/users/:id/block", isAuthenticated, isAdmin, blockUser);
router.patch("/users/:id/unblock", isAuthenticated, isAdmin, unBlockUser);
router.patch(
  "/users/:id/update-status",
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);

//* Product Moderation
router.get("/products", isAuthenticated, isAdmin, getAllProduct);
router.delete("/products/:id", isAuthenticated, isAdmin, deleteProduct);

export default router;
