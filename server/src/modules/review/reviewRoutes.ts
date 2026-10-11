import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import { createReview } from "./reviewController.js";

const router = express.Router();

router.post("/", isAuthenticated, createReview);

export default router;
