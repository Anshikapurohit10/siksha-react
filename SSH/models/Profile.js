// models/Profile.js
// import mongoose from "mongoose";

// const ProfileSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
//     collegeId: { type: String, required: true },
//     collegeName: { type: String, required: true },
//     rollNumber: { type: String, required: true },
//     semester: { type: String },
//     phone: { type: String, required: true },
//     department: { type: String },
//     role: { type: String, enum: ["student", "teacher", "admin"], required: true },
//     approved: { type: Boolean, default: false },
//     metadata: { type: Object },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Profile", ProfileSchema);
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  collegeId: { type: String, required: true },
  collegeName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  semester: { type: String },
  phone: { type: String, required: true },
  course: { type: String },
  role: { type: String, enum: ["student", "teacher", "admin"], required: true },
  approved: { type: Boolean, default: false },
  metadata: { type: Object },
}, { timestamps: true });
// await newProfile.save();
module.exports = mongoose.model("Profile", ProfileSchema);

