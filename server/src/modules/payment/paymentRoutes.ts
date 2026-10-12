import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import { createRazorpayOrder, verifyPayment } from "./paymentController.js";

const router = express.Router();

router.post("/", isAuthenticated, createRazorpayOrder);
router.post("/verify", isAuthenticated, verifyPayment);

export default router;
