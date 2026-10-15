import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import {
  createReview,
  deleteReview,
  fetchAllReviews,
  updateReview,
} from "./reviewController.js";

const router = express.Router();

//* Public route: fetch reviews for a product
router.get("/product/:productId", async (req, res) => {
  const { productId } = req.params;
  const reviews = await (
    await import("./reviewModel.js")
  ).default
    .find({ productId })
    .populate("userId", "username avatar")
    .sort({ createdAt: -1 })
    .lean();
  res.status(200).json({ success: true, reviews });
});

router.post("/:id", isAuthenticated, createReview);
router.patch("/:id", isAuthenticated, updateReview);
router.delete("/:id", isAuthenticated, deleteReview);

//* Admin Route
router.get("/", isAuthenticated, fetchAllReviews);

export default router;
