import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import Product from "./productModel.js";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../utils/paginate.js";
import getAIRecommendation from "../../utils/aiRecommendation.js";
import mongoose from "mongoose";

export const fetchAllProducts = async (req: Request, res: Response) => {
  const { search, category, price, rating, availability, page, limit } =
    req.query;

  const result = paginationSchema.safeParse({ page, limit });
  if (!result.success) {
    throw new AppError("Invalid pagination parameters", 400);
  }

  const { page: p, limit: l, skip } = getPaginationParams(result.data);
  const query: Record<string, any> = {};

  if (search && typeof search === "string") {
    query.name = { $regex: search.trim(), $options: "i" };
  }

  if (category && typeof category === "string") {
    query.category = category;
  }

  if (price && typeof price === "string") {
    const [min, max] = price.split("-").map(Number);
    if (!isNaN(min!) && !isNaN(max!)) {
      query.price = { $gte: min, $lte: max };
    }
  }

  if (rating) {
    query.rating = { $gte: Number(rating) };
  }

  if (availability === "out") {
    query.stock = 0;
  } else if (availability === "limited") {
    query.stock = { $gt: 0, $lte: 5 };
  } else if (availability === "in") {
    query.stock = { $gt: 5 };
  }

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .limit(l)
      .skip(skip)
      .lean(),
    Product.countDocuments(query),
  ]);

  if (!products.length) {
    return res.status(200).json({ success: true, products: [] });
  }
  const pagination = buildPaginationMeta(total, l, p);

  res.status(200).json({ success: true, products, pagination });
};

export const fetchProductDetails = async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invalid Product Id", 400);
  }

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json({ success: true, product });
};

export const fetchAiFilteredProducts = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (typeof prompt !== "string" || !prompt.trim()) {
    throw new AppError("Provide a valid prompt", 400);
  }

  const filteredProducts = await Product.find({})
    .select(
      "_id name description price category rating stock images sellerId createdAt"
    )
    .limit(50)
    .lean();
  if (!filteredProducts.length) {
    return res.status(200).json({
      success: true,
      message: "No Products found in the database.",
      products: [],
    });
  }

  const recommendedIds = await getAIRecommendation(
    prompt.trim(),
    filteredProducts.map((product) => ({
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      rating: product.rating,
      stock: product.stock,
    }))
  );
  const productsById = new Map(
    filteredProducts.map((product) => [product._id.toString(), product])
  );
  const products = recommendedIds.flatMap((id) => {
    const product = productsById.get(id);
    return product ? [product] : [];
  });

  res.status(200).json({
    success: true,
    message: products.length
      ? "AI Filtered Products"
      : "No products matched your preference.",
    products,
  });
};

export const fetchPriceBounds = async (req: Request, res: Response) => {
  const result = await Product.aggregate([
    {
      $group: {
        _id: null,
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);

  if (!result || result.length === 0) {
    throw new AppError("No products found to calculate price bounds", 404);
  }

  const { minPrice, maxPrice } = result[0];
  res.status(200).json({ minPrice, maxPrice });
};
