import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import { productValidationSchema } from "./productSchema.js";
import upload from "../../middlewares/multer.js";
import {
  createProduct,
  deleteProduct,
  fetchAiFilteredProducts,
  fetchAllProducts,
  fetchProductDetails,
  updateProduct,
} from "./productController.js";
import isSeller from "../../middlewares/seller.js";

const router = express.Router();

//* Admin Routes
router.post(
  "/",
  isAuthenticated,
  isSeller,
  upload.array("images", 4),
  validate(productValidationSchema),
  createProduct
);

router.patch(
  "/:id",
  isAuthenticated,
  isSeller,
  validate(productValidationSchema),
  updateProduct
);

router.delete("/:id", isAuthenticated, isSeller, deleteProduct);

//* Public Routes
router.get("/", fetchAllProducts);
router.post("/ai-search", fetchAiFilteredProducts);
router.get("/:id", fetchProductDetails);

export default router;
