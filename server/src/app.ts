import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHanlder.js";
import authRouter from "./modules/auth/authRoutes.js";
import userRouter from "./modules/user/userRoutes.js";

//* Instance
const app = express();

//* Middlewares
const allowedOrigins = [process.env.FRONTEND_URL!, "http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(helmet());

//* Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

//* Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
