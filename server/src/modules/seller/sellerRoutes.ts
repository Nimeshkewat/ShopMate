import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import isSeller from "../../middlewares/seller.js";
import {
  createProduct,
  deleteProduct,
  fetchSellerProducts,
  updateProduct,
} from "./controllers/sellerProductController.js";
import upload from "../../middlewares/multer.js";
import validate from "../../middlewares/validate.js";
import { productValidationSchema } from "../product/productSchema.js";
import {
  fetchSellerOrders,
  updateOrderStatus,
} from "./controllers/sellerOrderController.js";
import { getSellerDashboard } from "./controllers/sellerDashboardController.js";

const router = express.Router();

//* Seller Routes
router.get("/products", isAuthenticated, isSeller, fetchSellerProducts);
router.get("/dashboard", isAuthenticated, isSeller, getSellerDashboard);
router.get("/orders", isAuthenticated, isSeller, fetchSellerOrders);

router.post(
  "/products",
  isAuthenticated,
  isSeller,
  upload.array("images", 4),
  validate(productValidationSchema),
  createProduct
);

router.patch(
  "/products/:id",
  isAuthenticated,
  isSeller,
  validate(productValidationSchema),
  updateProduct
);

router.delete("/products/:id", isAuthenticated, isSeller, deleteProduct);

//* Seller Order Routes
router.patch(
  "/orders/:id/status",
  isAuthenticated,
  isSeller,
  updateOrderStatus
);

export default router;
