// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const rateLimit = require("express-rate-limit");
 
//  // routes
// const authRoutes = require("./routes/auth");
// const profileRoutes = require("./routes/profile");
// const attendanceRoutes = require("./routes/attendance");
// const assignmentRoutes = require("./routes/assignment");
// const submissionRoutes = require("./routes/submission");
// const activityRoutes = require("./routes/activity");
// const timelineRoutes = require("./routes/timeline");
// const adminRoutes = require("./routes/admin");
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";   // ✅ .js
import profileRoutes from "./routes/profile.js"; // ✅
import attendanceRoutes from "./routes/attendance.js"; // ✅
import assignmentRoutes from "./routes/assignment.js"; // ✅
import submissionRoutes from "./routes/submission.js"; // ✅
import activityRoutes from "./routes/activity.js"; // ✅
import timelineRoutes from "./routes/timeline.js"; // ✅
import adminRoutes from "./routes/admin.js"; // ✅
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";


const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));
// Middleware
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,               // allow cookies to be sent
}));

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// Database connect
mongoose
  .connect( "mongodb://localhost:27017/tresetu", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
 
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);//
app.use("/api/activities", activityRoutes);//
app.use("/api/timeline", timelineRoutes);
app.use("/api/admin", adminRoutes);//

// Health check
app.get("/", (req, res) => {
  res.send(" Smart Student Hub Backend Running...");
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on  http://localhost:${PORT}`));
