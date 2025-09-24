const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const Profile = require("../models/Profile.js");
const generateToken = require("../utils/jwt.js");
const authMiddleware = require("../middleware/auth.js");

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register user
 */
router.post("/register", async (req, res) => {
  //  console.log('Received POST to /api/auth/register, body:', req.body); 
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name){
      return res.status(400).json({ message: "Missing fields" });
    }
    // email = email.trim().toLowerCase();
    const existing = await User.findOne({ email });
    if (existing) {return res.status(400).json({ message: "User already exist...." });
  }
    const hashed = await bcrypt.hash(password, 6);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "student",
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    // 🔹 Only check profile for students
    if (user.role === "student") {
      const profile = await Profile.findOne({ user: user._id });
      if (!profile) return res.status(400).json({ message: "Profile not submitted yet" });
      if (!profile.approved) {
        return res.status(403).json({
          success: false,
          under_verification: true,
          message: "Profile under verification",
        });
      }
    }

    const token = generateToken(user);
        // ✅ Set token as httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", // or "none" if using https
      secure: false,   // true if using https
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (client should delete token)
 */
router.post("/logout", authMiddleware, (req, res) => {
  try {
    // Nothing to do server-side for stateless JWT, just tell client to drop token
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;