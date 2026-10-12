import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import {
  addToCart,
  clearCart,
  deleteCartItem,
  fetchCart,
  updateCartQuantity,
} from "./cartController.js";

const router = express.Router();

router.post("/", isAuthenticated, addToCart);
router.get("/", isAuthenticated, fetchCart);
router.delete("/clear", isAuthenticated, clearCart);
router.patch("/:id", isAuthenticated, updateCartQuantity);
router.delete("/:id", isAuthenticated, deleteCartItem);

export default router;
