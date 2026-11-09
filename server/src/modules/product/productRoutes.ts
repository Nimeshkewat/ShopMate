import express from "express";
import {
  fetchAiFilteredProducts,
  fetchAllProducts,
  fetchPriceBounds,
  fetchProductDetails,
} from "./productController.js";
import {
  rateLimiter,
  RATE_LIMIT_WINDOWS,
} from "../../middlewares/rateLimiters.js";

const router = express.Router();

//* Public Routes
router.get("/", fetchAllProducts);
router.get("/price-bounds", fetchPriceBounds);
router.post(
  "/ai-search",
  rateLimiter({
    windowMs: RATE_LIMIT_WINDOWS.fifteenMinutes,
    limit: 20,
    action: "AI product search",
  }),
  fetchAiFilteredProducts
);
router.get("/:id", fetchProductDetails);

export default router;
