export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock?: number;
}

export interface BackendCartItem {
  productId: {
    _id: string;
    name: string;
    images?: Array<{ public_id: string; url: string }>;
    stock?: number;
    price: number;
  } | string;
  price: number;
  quantity: number;
}

export interface BackendCart {
  _id: string;
  userId: string;
  items: BackendCartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartResponse {
  success: boolean;
  message?: string;
  cart: {
    _id?: string;
    userId?: string;
    items: CartItem[];
  };
}

export interface RawCartResponse {
  success: boolean;
  message?: string;
  cart: BackendCart;
}

export interface CartActionResponse {
  success: boolean;
  message: string;
  cart?: BackendCart;
}
