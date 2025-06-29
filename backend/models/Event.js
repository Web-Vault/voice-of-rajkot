import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    banner: { type: String },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    performerList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    views: { type: Number, default: 0 },
    ticketsSold: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    ticketHolders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
