import express from "express";
import {
  bookTicket,
  getUserTickets,
  getEventTickets
} from "../controllers/ticketController.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.post("/book", authenticateJWT, bookTicket);
router.get("/user/:userId", authenticateJWT, getUserTickets);
router.get("/event/:eventId", authenticateJWT, getEventTickets);

export default router; 