import type { Request, Response } from "express";
import mongoose from "mongoose";
import { AppError } from "../../utils/AppError.js";
import Cart from "./cartModel.js";
import Product from "../product/productModel.js";

export const addToCart = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { id: productId } = req.params;
  const { quantity } = req.body;

  let qty = Number(quantity);
  if (
    !qty ||
    qty <= 0 ||
    typeof productId !== "string" ||
    !mongoose.isValidObjectId(productId)
  ) {
    throw new AppError("Invalid Product Id or quantity", 400);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError("Product item not found", 404);
  }

  if (qty > product.stock) {
    throw new AppError(`Only (${product.stock}) items available in stock`, 400);
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [
        {
          productId,
          price: product.price,
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
    if (existingItem.quantity + qty > product.stock) {
      throw new AppError(
        `Cannot add more items. Total exceeds available stock (${product.stock}).`,
        400
      );
    }
    existingItem.quantity += qty;
  } else {
    cart.items.push({
      productId: product._id,
      price: product.price,
      quantity: qty,
    });
  }

  await cart.save();
  res.status(200).json({ success: true, message: "Item added to cart", cart });
};

export const fetchCart = async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "name images stock price",
  });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  res.status(200).json({ success: true, cart });
};

export const updateCartQuantity = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { id: productId } = req.params;
  const { quantity } = req.body;

  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invaliad cart id", 400);
  }
  const qty = Number(quantity);
  if (!qty || qty < 0) {
    throw new AppError("Invalid quantity", 400);
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const item = cart.items.find((item) => item.productId.equals(productId));
  if (!item) {
    throw new AppError("Item not found in cart", 404);
  }

  item.quantity = qty;
  await cart.save();

  res.status(200).json({ success: true, message: "Cart item updated", cart });
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { id: productId } = req.params;

  if (typeof productId !== "string" || !mongoose.isValidObjectId(productId)) {
    throw new AppError("Invaliad cart id", 400);
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  cart.items = cart.items.filter((item) => !item.productId.equals(productId));
  await cart.save();
  res.status(200).json({ success: true, message: "Cart item removed" });
};

export const clearCart = async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  cart.items = [];
  await cart.save();
  res.status(200).json({ success: true, message: "Cart cleared" });
};
