import express from "express";
import {
  getProfile,
  updateProfile,
  listUsers,
  getUserById
} from "../controllers/userController.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", authenticateJWT, getProfile);
router.put("/me", authenticateJWT, updateProfile);
router.get("/", listUsers);
router.get("/:id", authenticateJWT, getUserById);

export default router; 