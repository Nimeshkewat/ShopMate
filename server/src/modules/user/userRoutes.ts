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
import {
  rateLimiter,
  RATE_LIMIT_WINDOWS,
} from "../../middlewares/rateLimiters.js";

const router = express.Router();

router.get("/", isAuthenticated, profile);
router.patch(
  "/",
  rateLimiter({
    windowMs: RATE_LIMIT_WINDOWS.fifteenMinutes,
    limit: 2,
    action: "profile update",
  }),
  isAuthenticated,
  upload.single("avatar"),
  updateProfile
);
router.patch(
  "/update-password",
  rateLimiter({
    windowMs: RATE_LIMIT_WINDOWS.fifteenMinutes,
    limit: 5,
    action: "password update",
  }),
  isAuthenticated,
  updatePassword
);
router.patch(
  "/become-seller",
  rateLimiter({
    windowMs: RATE_LIMIT_WINDOWS.fifteenMinutes,
    limit: 5,
    action: "seller upgrade",
  }),
  isAuthenticated,
  upload.single("shopImage"),
  validate(sellerValidationSchema),
  upgradeToSeller
);

export default router;
