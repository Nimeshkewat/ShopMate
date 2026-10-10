import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import uploadToCloudinary from "../../utils/uploadToCloudinary.js";
import Product from "./productModel.js";

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
