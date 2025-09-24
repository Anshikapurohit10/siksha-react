const express = require("express");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/roles");
const Activity = require("../models/Activity");
const Timeline = require("../models/Timeline");
const upload = require("../middleware/upload");
const { uploadBuffer } = require("../utils/cloudinary");

const router = express.Router();

// Student create activity with proof files
router.post("/", auth, requireRole("student"), upload.array("proof", 5), async (req, res) => {
  try {
    const { title, description, category, dateOfEvent } = req.body;
    const files = [];
    if (req.files && req.files.length) {
      for (const f of req.files) {
        const url = await uploadBuffer(f.buffer, `activities/${req.user._id}`);
        files.push(url);
      }
    }
    const act = await Activity.create({
      student: req.user._id,
      title,
      description,
      category,
      dateOfEvent,
      proof: files
    });

    await Timeline.create({
      user: req.user._id,
      type: "activity",
      refId: act._id,
      message: `Added activity: ${title}`,
      meta: { category }
    });

    res.status(201).json({ success: true, act });
  } catch (err) {
  console.error("Upload Error:", err);  // 👈 log full error
  res.status(500).json({ message: err.message, stack: err.stack });
}
});


// Student get own activities
router.get("/mine", auth, async (req, res) => {
  const acts = await Activity.find({ student: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, acts });
});
// Teacher verify activity
router.patch("/:id/verify", auth, requireRole("teacher"), async (req, res) => {
  try {
    const act = await Activity.findById(req.params.id);
    if (!act) return res.status(404).json({ message: "Activity not found" });

    act.status = req.body.status; // "verified" or "rejected"
    await act.save();

    await Timeline.create({
      user: act.student,
      type: "activity_verification",
      refId: act._id,
      message: `Activity ${req.body.status} by teacher`
    });

    res.json({ success: true, act });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Teacher fetch all activities
router.get("/", auth, requireRole("teacher"), async (req, res) => {
  try {
    const acts = await Activity.find().populate("student", "name rollNo email branch");
    res.json({ success: true, acts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
