import express from "express";
import { getAllShops, getShopProducts } from "./shopController.js";

const router = express.Router();

router.get("/", getAllShops);
router.get("/:id", getShopProducts);

export default router;
