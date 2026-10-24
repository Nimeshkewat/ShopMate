import mongoose from "mongoose";
import uploadToCloudinary from "../../../utils/uploadToCloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import type { Request, Response } from "express";
import { AppError } from "../../../utils/AppError.js";
import Product from "../../product/productModel.js";
import {
  buildPaginationMeta,
  getPaginationParams,
  paginationSchema,
} from "../../../utils/paginate.js";

export const createProduct = async (req: Request, res: Response) => {
  const { id: sellerId } = req.user;
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
    sellerId,
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

export const fetchSellerProducts = async (req: Request, res: Response) => {
  const { id: sellerId } = req.user;
  const { page, limit } = req.query;

  const result = paginationSchema.safeParse({ page, limit });
  if (!result.success) {
    throw new AppError("Invalid pagination parameters", 400);
  }

  const { page: p, limit: l, skip } = getPaginationParams(result.data);
  const [products, total] = await Promise.all([
    Product.find({ sellerId })
      .limit(l)
      .skip(skip)
      .sort({ createdAt: -1 })
      .lean(),
    Product.countDocuments({ sellerId }),
  ]);

  const pagination = buildPaginationMeta(total, l, p);
  res.status(200).json({ success: true, products, pagination });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id: sellerId } = req.user;
  const { id: productId } = req.params;
  const { name, description, price, stock, category } = req.body;

  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invalid Product Id", 400);
  }

  const product = await Product.findOne({ _id: productId, sellerId });
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
  const { id: sellerId } = req.user;
  const { id: productId } = req.params;

  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invalid Product Id", 400);
  }

  const product = await Product.findOneAndDelete({ _id: productId, sellerId });
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
