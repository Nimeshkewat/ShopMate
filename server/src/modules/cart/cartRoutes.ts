import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import { addToCart } from "./cartController.js";

const router = express.Router();

router.post("/", isAuthenticated, addToCart);

export default router;
