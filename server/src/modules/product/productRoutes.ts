import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
import validate from "../../middlewares/validate.js";
import { productValidationSchema } from "./productSchema.js";
import upload from "../../middlewares/multer.js";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProductDetails,
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
  "/:id",
  isAuthenticated,
  isAdmin,
  validate(productValidationSchema),
  updateProduct
);

router.delete("/:id", isAuthenticated, isAdmin, deleteProduct);

//* Public Routes
router.get("/", fetchAllProducts);
router.get("/:id", fetchProductDetails);

export default router;
