import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const otp = generateOTP();
    user.emailOTP = otp;
    user.emailOTPExpires = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();
    console.log(`[OTP] Sending OTP ${otp} to ${email}`);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your Email Verification OTP",
      text: `Your OTP is: ${otp}`,
    });
    res.json({ message: "OTP sent to email" });
  } catch (err) {
    next(err);
  }
};

export const verifyEmailOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.emailOTP || !user.emailOTPExpires) {
      return res.status(400).json({ message: "No OTP requested" });
    }
    if (user.emailOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.emailOTPExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    user.emailVerified = true;
    user.emailOTP = undefined;
    user.emailOTPExpires = undefined;
    await user.save();
    console.log(`[OTP] Email verified for ${email}`);
    res.json({ message: "Email verified" });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, mobile, isArtist, artistProfile } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      isArtist: !!isArtist,
      artistProfile: isArtist ? artistProfile : undefined,
      role: isArtist ? "artist" : "user",
    });
    await user.save();
    console.log(`[REGISTER] User registered: ${user.email}`);
    res.status(201).json({ message: "Registration successful. Please verify your email." });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, isArtist: user.isArtist },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log(`[LOGIN] User logged in: ${user.email}`);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, isArtist: user.isArtist } });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    // TODO: Forgot password logic
    res.json({ message: "Forgot password endpoint" });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    // TODO: Reset password logic
    res.json({ message: "Reset password endpoint" });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req, res) => {
  // TODO: Email verification logic
  res.json({ message: "Verify email endpoint" });
};

export const verifyMobile = async (req, res) => {
  // TODO: Mobile verification logic
  res.json({ message: "Verify mobile endpoint" });
}; 