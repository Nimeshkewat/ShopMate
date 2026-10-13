import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/isAdmin.js";
import {
  approveSeller,
  getPendingSellers,
  rejectSeller,
} from "./controllers/sellerAdminController.js";

const router = express.Router();

//* Seller Management
router.get("/pending-sellers", isAuthenticated, isAdmin, getPendingSellers);
router.patch("/approve-seller", isAuthenticated, isAdmin, approveSeller);
router.patch("/reject-seller", isAuthenticated, isAdmin, rejectSeller);

export default router;
