import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import uploadToCloudinary from "../../utils/uploadToCloudinary.js";
import Product from "./productModel.js";
import {
  buildPaginationMeta,
  getPaginationParams,
} from "../../utils/paginate.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import getAIRecommendation from "../../utils/aiRecommendation.js";

export const createProduct = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { name, description, price, category, stock } = req.body;

  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    throw new AppError("Please upload at least one product image.", 400);
  }

  const uploadPromises = (req.files as Express.Multer.File[]).map((file) =>
    uploadToCloudinary(file.buffer, {
      folder: "Products_folder",
      type: "product",
    })
  );

  const uploadResults = await Promise.all(uploadPromises);
  const productImages = uploadResults.map((result) => ({
    public_id: result.public_id,
    url: result.secure_url,
  }));

  const newProduct = await Product.create({
    userId,
    name,
    description,
    price: Number(price),
    category,
    stock: stock ? Number(stock) : 0,
    images: productImages,
  });

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    newProduct,
  });
};

export const fetchAllProducts = async (req: Request, res: Response) => {
  const { search, category, price, rating } = req.query;

  const { page, limit, skip } = getPaginationParams(req.query);
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

  const [products, total] = await Promise.all([
    Product.find(query).limit(limit).skip(skip).sort().lean(),
    Product.countDocuments(query),
  ]);

  if (!products.length) {
    res.status(200).json({ success: true, products: [] });
  }
  const pagination = buildPaginationMeta(total, limit, page);

  res.status(200).json({ success: true, products, pagination });
};

export const fetchProductDetails = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { id: productId } = req.params;

  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invalid Product Id", 400);
  }

  const product = await Product.findOne({ _id: productId, userId });
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json({ success: true, product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { id: productId } = req.params;
  const { name, description, price, stock, category } = req.body;

  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invalid Product Id", 400);
  }

  const product = await Product.findOne({ _id: productId, userId });
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.stock = stock || product.stock;
  await product.save();

  res
    .status(200)
    .json({ success: true, message: "Product Updated Successfully", product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { id: productId } = req.params;

  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invalid Product Id", 400);
  }

  const product = await Product.findOneAndDelete({ _id: productId, userId });
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (product.images && product.images.length > 0) {
    const deletedPromises = product.images.map((image) =>
      cloudinary.uploader
        .destroy(image.public_id)
        .catch((error) =>
          console.log(`Failed to delete product image: ${error}`)
        )
    );

    await Promise.all(deletedPromises);
  }
  res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully" });
};

export const fetchAiFilteredProducts = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    throw new AppError("Provide a valid prompt", 400);
  }

  const filteredProducts = await Product.find({}).limit(50).lean();
  if (!filteredProducts.length) {
    return res.status(200).json({
      success: true,
      message: "No Products found in the database.",
      products: [],
    });
  }

  const { success, products } = await getAIRecommendation(
    req,
    res,
    prompt,
    filteredProducts as any
  );

  res.status(200).json({
    success,
    message: products.length
      ? "AI Filtered Products"
      : "No products matched your preference.",
    products,
  });
};
