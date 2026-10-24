import express from "express";
import {
  fetchAiFilteredProducts,
  fetchAllProducts,
  fetchProductDetails,
} from "./productController.js";

const router = express.Router();

//* Public Routes
router.get("/", fetchAllProducts);
router.post("/ai-search", fetchAiFilteredProducts);
router.get("/:id", fetchProductDetails);

export default router;
