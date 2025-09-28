const express = require("express");
const router = express.Router();
const upcomingClasses = require("../data/classes");

// GET /classes - Get all upcoming classes
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: upcomingClasses,
    count: upcomingClasses.length,
  });
});

module.exports = router;
