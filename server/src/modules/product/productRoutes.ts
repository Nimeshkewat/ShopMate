import express from "express";
import {
  fetchAiFilteredProducts,
  fetchAllProducts,
  fetchPriceBounds,
  fetchProductDetails,
} from "./productController.js";

const router = express.Router();

//* Public Routes
router.get("/", fetchAllProducts);
router.get("/price-bounds", fetchPriceBounds);
router.post("/ai-search", fetchAiFilteredProducts);
router.get("/:id", fetchProductDetails);

export default router;
