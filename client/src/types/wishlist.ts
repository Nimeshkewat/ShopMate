import type { ProductImage } from "./product";

export interface WishlistProduct {
  _id: string;
  name: string;
  images: ProductImage[];
  price: number;
  stock: number;
}

export interface Wishlist {
  userId: string;
  products: WishlistProduct[];
}

export interface AddToWishlistResponse {
  success: boolean;
  wishlist: Wishlist;
}

export interface WishlistResponse {
  success: boolean;
  wishlist: Wishlist;
}

export interface RemoveFromWishlistResponse {
  success: boolean;
  message: string;
  wishlist: Wishlist;
}

export interface ClearWishlistResponse {
  success: boolean;
  message: string;
}
