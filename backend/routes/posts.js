import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  approvePost
} from "../controllers/postController.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateJWT, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", authenticateJWT, updatePost);
router.delete("/:id", authenticateJWT, deletePost);
router.post("/:id/approve", authenticateJWT, approvePost); // For admin approval

export default router; 