import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import {
  addToWishlist,
  clearWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "./wishlistController.js";

const router = express.Router();

router.get("/", isAuthenticated, fetchWishlist);
router.post("/:id", isAuthenticated, addToWishlist);
router.delete("/clear", isAuthenticated, clearWishlist);
router.delete("/:id", isAuthenticated, removeFromWishlist);

export default router;
