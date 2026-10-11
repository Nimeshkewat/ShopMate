import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import mongoose from "mongoose";
import Review from "./reviewModel.js";
import Order from "../order/orderModel.js";

export const createReview = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { rating, comment } = req.body;

  const { id: productId } = req.params;
  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invalid Product Id", 400);
  }

  const alreadyReviewed = await Review.findOne({ userId, productId });
  if (alreadyReviewed) {
    throw new AppError("You have already reviewed this product", 400);
  }

  if (!rating || !comment) {
    throw new AppError("Please provide rating and comment", 400);
  }

  const hasPurchased = await Order.findOne({
    userId,
    orderItems: { $elemMatch: { productId } },
  });

  if (!hasPurchased) {
    throw new AppError("You can only review products you have purchased", 403);
  }

  const review = await Review.create({
    userId,
    productId,
    rating,
    comment,
  });

  res
    .status(201)
    .json({ success: true, message: "Review Added Successfully", review });
};

export const fetchAllReviews = async (req: Request, res: Response) => {
  const { userId } = req.user;

  const reviews = await Review.find({ userId }).lean();
  if (!reviews.length) {
    res.status(200).json({ success: true, reviews: [] });
  }

  res.status(200).json({ success: true, reviews });
};

export const updateReview = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { rating, comment } = req.body;

  const { id: reviewId } = req.params;
  if (typeof reviewId !== "string" || !mongoose.isValidObjectId(reviewId)) {
    throw new AppError("Invalid Product Id", 400);
  }

  const review = await Review.findOne({ userId, _id: reviewId });
  if (!review) {
    throw new AppError("Review not found", 404);
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;
  await review.save();

  res
    .status(200)
    .json({ success: true, message: "Review Updated Successfully", review });
};

export const deleteReview = async (req: Request, res: Response) => {
  const { userId } = req.user;

  const { id: reviewId } = req.params;
  if (typeof reviewId !== "string" || !mongoose.isValidObjectId(reviewId)) {
    throw new AppError("Invalid Product Id", 400);
  }

  const review = await Review.findOneAndDelete({ userId, _id: reviewId });
  if (!review) {
    throw new AppError("Review not found", 404);
  }

  res
    .status(200)
    .json({ success: true, message: "Review Deleted Successfully" });
};
