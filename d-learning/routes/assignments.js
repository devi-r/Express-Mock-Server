const express = require("express");
const router = express.Router();
const assignments = require("../data/assignments");

// GET /assignments - Get all assignments
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: assignments,
    count: assignments.length,
  });
});

module.exports = router;
