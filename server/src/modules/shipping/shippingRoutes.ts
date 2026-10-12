import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import {
  addShippingInfo,
  fetchAllShippingInfo,
  fetchShippingInfo,
} from "./shippingController.js";
import validate from "../../middlewares/validate.js";
import { shippingValidationSchema } from "./shippingSchema.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  validate(shippingValidationSchema),
  addShippingInfo
);
router.get("/", isAuthenticated, fetchAllShippingInfo);
router.get("/:id", isAuthenticated, fetchShippingInfo);

export default router;
