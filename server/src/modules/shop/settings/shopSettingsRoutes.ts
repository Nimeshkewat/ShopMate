import express from "express";
import isAuthenticated from "../../../middlewares/auth.js";
import isSeller from "../../../middlewares/seller.js";
import upload from "../../../middlewares/multer.js";
import validate from "../../../middlewares/validate.js";
import { updateSellerValidationSchema } from "./shopSettingsSchema.js";
import { getShop, updateShop } from "./shopSettingsController.js";

const router = express.Router();

router.get("/", isAuthenticated, getShop);
router.patch(
  "/",
  isAuthenticated,
  isSeller,
  upload.single("shopImage"),
  validate(updateSellerValidationSchema),
  updateShop
);

export default router;
