import type { Request, Response } from "express";
import mongoose from "mongoose";
import { AppError } from "../../utils/AppError.js";
import Cart from "./cartModel.js";
import Product from "../product/productModel.js";

export const addToCart = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { id: productId } = req.params;
  const { quantity } = req.body;

  if (
    !quantity ||
    typeof productId !== "string" ||
    !mongoose.isValidObjectId(productId)
  ) {
    throw new AppError("Invalid Product Id or quantity", 400);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError("Product item not found", 404);
  }

  let qty = Number(quantity);
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [
        {
          productId,
          name: product.name,
          price: product.price,
          image: product.images[0]?.url || "",
          quantity: qty,
        },
      ],
    });

    return res
      .status(201)
      .json({ success: true, message: "Item added to cart", cart });
  }

  const existingItem = cart.items.find((item) =>
    item.productId.equals(productId)
  );

  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.items.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || "",
      quantity: qty,
    });
  }

  await cart.save();
  res.status(200).json({ success: true, message: "Item added to cart", cart });
};
