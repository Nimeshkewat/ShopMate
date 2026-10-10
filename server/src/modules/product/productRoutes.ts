import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
import validate from "../../middlewares/validate.js";
import { productValidationSchema } from "./productSchema.js";
import upload from "../../middlewares/multer.js";
import {
  createProduct,
  fetchAllProducts,
  updateProduct,
} from "./productController.js";

const router = express.Router();

//* Admin Routes
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  upload.array("images", 4),
  validate(productValidationSchema),
  createProduct
);
router.patch(
  "/",
  isAuthenticated,
  isAdmin,
  validate(productValidationSchema),
  updateProduct
);

//* Public Routes
router.get("/", fetchAllProducts);

export default router;
