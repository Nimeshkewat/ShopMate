import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import { addToCart, fetchCart, upadteCart } from "./cartController.js";

const router = express.Router();

router.post("/", isAuthenticated, addToCart);
router.get("/", isAuthenticated, fetchCart);
router.patch("/:id", isAuthenticated, upadteCart);

export default router;
