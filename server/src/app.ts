import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHanlder.js";
import authRouter from "./modules/auth/authRoutes.js";
import userRouter from "./modules/user/userRoutes.js";
import productRouter from "./modules/product/productRoutes.js";
import reviewRouter from "./modules/review/reviewRoutes.js";
import cartRouter from "./modules/cart/cartRoutes.js";
import wishlistRouter from "./modules/wishlist/wishlistRoutes.js";
import shippingRouter from "./modules/shipping/shippingRoutes.js";
import orderRouter from "./modules/order/orderRoutes.js";
import paymentRouter from "./modules/payment/paymentRoutes.js";
import { razorpayWebhook } from "./modules/payment/paymentController.js";
import adminRouter from "./modules/admin/adminRoutes.js";
import sellerRouter from "./modules/seller/sellerRoutes.js";
import shopRouter from "./modules/shop/shopRoutes.js";
import shopSettingsRouter from "./modules/shop/settings/shopSettingsRoutes.js";
import { globalLimiter } from "./middlewares/rateLimiters.js";

//* Instance
const app = express();

//* Middlewares
app.use(
  cors({
    origin: [process.env.LOCAL_HOST!, process.env.FRONTEND_URL!],
    credentials: true,
  })
);
app.use(helmet());
app.use(globalLimiter);

app.post(
  "/api/v1/payments/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

//* Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/shipping", shippingRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/shop", shopRouter);
app.use("/api/v1/shop-settings", shopSettingsRouter);

//* Seller Route
app.use("/api/v1/seller", sellerRouter);

//* Admin Route
app.use("/api/v1/admin", adminRouter);

//* Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
