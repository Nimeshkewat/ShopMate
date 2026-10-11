import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import {
  createReview,
  deleteReview,
  fetchAllReviews,
  updateReview,
} from "./reviewController.js";

const router = express.Router();

router.post("/", isAuthenticated, createReview);
router.patch("/", isAuthenticated, updateReview);
router.delete("/", isAuthenticated, deleteReview);

//* Admin Route
router.get("/", isAuthenticated, fetchAllReviews);

export default router;
