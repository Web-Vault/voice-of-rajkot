import User from "../models/User.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log(`[USER] Profile fetched for: ${req.user.id}`);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    // Prevent role or password change here
    delete updates.role;
    delete updates.password;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, select: "-password" });
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log(`[USER] Profile updated for: ${req.user.id}`);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter).select("-password");
    console.log(`[USER] Users listed. Count: ${users.length}`);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log(`[USER] User fetched by ID: ${req.params.id}`);
    res.json(user);
  } catch (err) {
    next(err);
  }
}; 