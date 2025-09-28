const express = require("express");
const router = express.Router();
const enrolledCourses = require("../data/courses");

// GET /courses - Get all courses
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: enrolledCourses,
    count: enrolledCourses.length,
  });
});

module.exports = router;
