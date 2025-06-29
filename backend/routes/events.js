import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventAnalytics,
  approveEvent
} from "../controllers/eventController.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateJWT, createEvent);
router.get("/", getEvents);
router.get("/analytics", authenticateJWT, getEventAnalytics); // For analytics
router.get("/:id", getEventById);
router.put("/:id", authenticateJWT, updateEvent);
router.delete("/:id", authenticateJWT, deleteEvent);
router.post("/:id/approve", authenticateJWT, approveEvent); // For admin approval

export default router; 