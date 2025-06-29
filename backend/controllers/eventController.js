import Event from "../models/Event.js";
import User from "../models/User.js";

export const createEvent = async (req, res, next) => {
  try {
    const { title, description, banner, venue, date, seats, price, performerList } = req.body;
    const event = new Event({
      title,
      description,
      banner,
      venue,
      date,
      seats,
      price,
      performerList,
      createdBy: req.user.id,
      approvalStatus: "pending",
    });
    await event.save();
    console.log(`[EVENT] Created: ${event._id}`);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const { type, date, artist, approvalStatus } = req.query;
    let filter = {};
    if (type) filter.type = type;
    if (date) filter.date = date;
    if (artist) filter.performerList = artist;
    if (approvalStatus) filter.approvalStatus = approvalStatus;
    const events = await Event.find(filter).populate("performerList", "name").populate("createdBy", "name");
    console.log(`[EVENT] Events fetched. Count: ${events.length}`);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate("performerList", "name").populate("createdBy", "name");
    if (!event) return res.status(404).json({ message: "Event not found" });
    console.log(`[EVENT] Event fetched by ID: ${req.params.id}`);
    res.json(event);
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    Object.assign(event, req.body);
    await event.save();
    console.log(`[EVENT] Updated: ${event._id}`);
    res.json(event);
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    await event.deleteOne();
    console.log(`[EVENT] Deleted: ${req.params.id}`);
    res.json({ message: "Event deleted" });
  } catch (err) {
    next(err);
  }
};

export const getEventAnalytics = async (req, res, next) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalTicketsSold = await Event.aggregate([{ $group: { _id: null, total: { $sum: "$ticketsSold" } } }]);
    const totalRevenue = await Event.aggregate([{ $group: { _id: null, total: { $sum: "$revenue" } } }]);
    const topViewed = await Event.find().sort({ views: -1 }).limit(5).select("title views");
    console.log(`[EVENT] Analytics fetched`);
    res.json({
      totalEvents,
      totalTicketsSold: totalTicketsSold[0]?.total || 0,
      totalRevenue: totalRevenue[0]?.total || 0,
      topViewed,
    });
  } catch (err) {
    next(err);
  }
};

export const approveEvent = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can approve/reject events" });
    }
    const { status } = req.body; // 'approved' or 'rejected'
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.approvalStatus = status;
    await event.save();
    console.log(`[EVENT] Approval status changed: ${event._id} -> ${status}`);
    res.json({ message: `Event ${status}` });
  } catch (err) {
    next(err);
  }
}; 