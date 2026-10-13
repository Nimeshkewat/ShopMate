import express from "express";
import isAuthenticated from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/isAdmin.js";
import { getPendingSellers } from "./controllers/sellerAdminController.js";

const router = express.Router();

//* Seller Management
router.get("/pending-sellers", isAuthenticated, isAdmin, getPendingSellers);

export default router;
