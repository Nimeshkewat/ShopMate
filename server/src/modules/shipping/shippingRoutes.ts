import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import { addShippingInfo } from "./shippingController.js";
import validate from "../../middlewares/validate.js";
import { shippingValidationSchema } from "./shippingSchema.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  validate(shippingValidationSchema),
  addShippingInfo
);

export default router;
