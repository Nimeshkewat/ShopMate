import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

//* Instance
const app = express();

//* Middlewares
const allowedOrigins = [process.env.FRONTEND_URL!, "http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(helmet());

//* Routes

export default app;
