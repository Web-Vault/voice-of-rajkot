import Ticket from "../models/Ticket.js";
import Event from "../models/Event.js";

export const bookTicket = async (req, res, next) => {
  try {
    const { eventId, seatNumber } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.ticketsSold >= event.seats) {
      return res.status(400).json({ message: "Event is sold out" });
    }
    // Optionally: check if seatNumber is already booked
    const ticket = new Ticket({
      event: eventId,
      user: req.user.id,
      seatNumber,
      paymentStatus: "paid", // Assume payment is handled elsewhere
    });
    await ticket.save();
    event.ticketsSold += 1;
    event.revenue += event.price;
    event.ticketHolders.push(ticket._id);
    await event.save();
    console.log(`[TICKET] Booked: ${ticket._id} for event ${eventId}`);
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
};

export const getUserTickets = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    const tickets = await Ticket.find({ user: req.params.userId }).populate("event");
    console.log(`[TICKET] Tickets fetched for user: ${req.params.userId}, Count: ${tickets.length}`);
    res.json(tickets);
  } catch (err) {
    next(err);
  }
};

export const getEventTickets = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    const tickets = await Ticket.find({ event: req.params.eventId }).populate("user", "name email");
    console.log(`[TICKET] Tickets fetched for event: ${req.params.eventId}, Count: ${tickets.length}`);
    res.json(tickets);
  } catch (err) {
    next(err);
  }
}; 