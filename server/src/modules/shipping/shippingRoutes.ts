import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import {
  addShippingInfo,
  deleteShippingInfo,
  fetchAllShippingInfo,
  fetchShippingInfo,
  updateShippingInfo,
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
router.put(
  "/:id",
  isAuthenticated,
  validate(shippingValidationSchema),
  updateShippingInfo
);
router.delete("/:id", isAuthenticated, deleteShippingInfo);

export default router;
