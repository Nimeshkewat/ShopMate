import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import {
  profile,
  updatePassword,
  updateProfile,
  upgradeToSeller,
} from "./userController.js";
import upload from "../../middlewares/multer.js";
import validate from "../../middlewares/validate.js";
import { sellerValidationSchema } from "./userSchema.js";

const router = express.Router();

router.get("/", isAuthenticated, profile);
router.patch("/", isAuthenticated, upload.single("avatar"), updateProfile);
router.patch("/update-password", isAuthenticated, updatePassword);
router.patch(
  "/become-seller",
  isAuthenticated,
  upload.single("shopImage"),
  validate(sellerValidationSchema),
  upgradeToSeller
);

export default router;
