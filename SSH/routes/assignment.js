// import express from "express";
// import auth from "../middleware/auth.js";
// import requireRole from "../middleware/roles.js";
// import Assignment from "../models/Assignment.js";
// import Timeline from "../models/Timeline.js";

// const router = express.Router();

// // Create assignment (teacher)
// router.post("/", auth, requireRole(["teacher", "admin"]), async (req, res) => {
//   try {
//     const payload = { ...req.body, createdBy: req.user._id };
//     const assignment = await Assignment.create(payload);
//     res.status(201).json({ success: true, assignment });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get active assignments (students)
// router.get("/", auth, async (req, res) => {
//   const assignments = await Assignment.find({ isActive: true }).sort({ dueDate: 1 });
//   res.json({ success: true, assignments });
// });

// // Teacher update
// router.put("/:id", auth, requireRole(["teacher", "admin"]), async (req, res) => {
//   const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (!assignment) return res.status(404).json({ message: "Not found" });
//   res.json({ success: true, assignment });
// });

// // Teacher delete (soft)
// router.delete("/:id", auth, requireRole(["teacher", "admin"]), async (req, res) => {
//   const assignment = await Assignment.findByIdAndUpdate(
//     req.params.id,
//     { isActive: false },
//     { new: true }
//   );
//   res.json({ success: true, assignment });
// });

// export default router;
const express = require("express");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/roles");
const Assignment = require("../models/Assignment");
const Timeline = require("../models/Timeline");
const router = express.Router();

// Create assignment (teacher)
router.post("/", auth, requireRole(["teacher","admin"]), async (req, res) => {
  try {
    const payload = { ...req.body, createdBy: req.user._id };
    const assignment = await Assignment.create(payload);
    // optionally timeline for class or students
    res.status(201).json({ success: true, assignment });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get active assignments (students)
router.get("/", auth, async (req, res) => {
  const assignments = await Assignment.find({ isActive: true }).sort({ dueDate: 1 });
  res.json({ success: true, assignments });
});

// Teacher update/delete - update
router.put("/:id", auth, requireRole(["teacher","admin"]), async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!assignment) return res.status(404).json({ message: "Not found" });
  res.json({ success: true, assignment });
});

// Teacher delete (soft)
router.delete("/:id", auth, requireRole(["teacher","admin"]), async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  res.json({ success: true, assignment });
});

module.exports = router;
