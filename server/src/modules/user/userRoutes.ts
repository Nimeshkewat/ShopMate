import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import {
  profile,
  updatePassword,
  updateProfile,
  upgradeToSeller,
} from "./userController.js";
import upload from "../../middlewares/multer.js";

const router = express.Router();

router.get("/", isAuthenticated, profile);
router.patch("/", isAuthenticated, upload.single("avatar"), updateProfile);
router.patch("/update-password", isAuthenticated, updatePassword);
router.patch("/become-seller", isAuthenticated, upgradeToSeller);

export default router;
