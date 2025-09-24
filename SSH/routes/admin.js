const express = require("express");
const auth = require("../middleware/auth.js");
const requireRole = require("../middleware/roles.js");
const Profile = require("../models/Profile.js");
const Activity = require("../models/Activity.js");
const Timeline = require("../models/Timeline.js");
const Submission = require("../models/Submission"); 
const router = express.Router();

// list profiles pending
router.get("/profiles/pending", auth, requireRole(["teacher","admin"]), async (req, res) => {
  const list = await Profile.find({ approved: false }).populate("user","name email ");
  res.json({ success: true, list });
});

// approve profile
router.put("/profiles/:id/approve", auth, requireRole(["teacher","admin"]), async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) return res.status(404).json({ message: "Not found" });
  profile.approved = true; await profile.save();
  
  await Timeline.create({ user: profile.user, type: "system", message: "Profile approved" });
  res.json({ success: true, profile });
});

// approve activity
router.put("/activities/:id/approve", auth, requireRole(["teacher","admin"]), async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  if (!activity) return res.status(404).json({ message: "Not found" });
  activity.status = "approved"; activity.approvedBy = req.user._id; activity.approvedAt = new Date(); await activity.save();
  await Timeline.create({ user: activity.student, type: "activity", refId: activity._id, message: "Activity approved" });
  res.json({ success: true, activity });
});
router.get("/activities/pending", auth, requireRole(["teacher", "admin"]), async (req, res) => {
  try {
   const activities = await Activity.find({ status: "pending" })
  .populate({
    path: 'student',
    select: 'name',
    populate: {
      path: 'profile',
      select: 'department' // Now we get the department
    }
  })
  .sort({ createdAt: -1 });
    res.json({ success: true, list: activities });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// reject activity
router.put("/activities/:id/reject", auth, requireRole(["teacher","admin"]), async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  if (!activity) return res.status(404).json({ message: "Not found" });
  activity.status = "rejected"; await activity.save();
  await Timeline.create({ user: activity.student, type: "activity", refId: activity._id, message: "Activity rejected" });
  res.json({ success: true, activity });
});
 
 
 
// Make sure Submission model is imported
 

 

// --- ADD THIS NEW ROUTE FOR DASHBOARD STATS ---
router.get("/dashboard-stats", auth, requireRole(["teacher", "admin"]), async (req, res) => {
  try {
    const [assessmentData, participationData, recentActivity] = await Promise.all([
      // 1. Get stats for the Assessment Pie Chart (Graded vs Submitted)
      Submission.aggregate([
        { $group: { _id: "$status", value: { $sum: 1 } } },
        { $project: { name: "$_id", value: 1, _id: 0 } }
      ]),
      // 2. Get stats for Student Participation Bar Chart (by activity category)
      Activity.aggregate([
        { $match: { status: "approved" } },
        { $group: { _id: "$category", value: { $sum: 1 } } },
        { $project: { name: "$_id", value: 1, _id: 0 } }
      ]),
      // 3. Get the 5 most recent submissions for the Activity Feed
      Submission.find({})
        .sort({ submittedAt: -1 })
        .limit(5)
        .populate("student", "name")
    ]);

    res.json({ success: true, assessmentData, participationData, recentActivity });

  } catch (err) {
    res.status(500).json({ message: "Server error fetching stats.", error: err.message });
  }
});


// ... (rest of your admin.js routes like /profiles/pending, etc.)

module.exports = router;
