import mongoose from "mongoose";

const artistProfileSchema = new mongoose.Schema(
  {
    artType: { type: String }, // e.g., Singer, Poet, Dancer
    category: { type: String }, // e.g., Ghazal, Standup, Painting
    experience: { type: String }, // e.g., '2 years', 'Beginner', etc.
    contactInfo: { type: String }, // Optional
    // Add more fields as needed
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    role: { type: String, enum: ["user", "artist", "admin"], default: "user" },
    isArtist: { type: Boolean, default: false },
    artistProfile: artistProfileSchema,
    profilePhoto: { type: String },
    bio: { type: String },
    ticketHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    emailVerified: { type: Boolean, default: false },
    mobileVerified: { type: Boolean, default: false },
    emailOTP: { type: String },
    emailOTPExpires: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
