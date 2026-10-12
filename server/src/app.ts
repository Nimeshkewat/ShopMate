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
import shippingRouter from "./modules/shipping/shippingRoutes.js";
import orderRouter from "./modules/order/orderRoutes.js";
import paymentRouter from "./modules/payment/paymentRoutes.js";

//* Instance
const app = express();

//* Webhook
express.raw({ type: "application/json" });

//* Middlewares
const allowedOrigins = [process.env.FRONTEND_URL!, "http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(helmet());

//* Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/shipping", shippingRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payment", paymentRouter);

//* Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
