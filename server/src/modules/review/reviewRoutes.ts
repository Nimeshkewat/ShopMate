import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import { createReview, fetchAllReviews } from "./reviewController.js";

const router = express.Router();

router.post("/", isAuthenticated, createReview);

//* Admin Route
router.get("/", isAuthenticated, fetchAllReviews);

export default router;
