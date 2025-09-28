const express = require("express");
const router = express.Router();
const sharedTests = require("../data/tests");

// GET /tests - Get all tests
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: sharedTests,
    count: sharedTests.length,
  });
});

module.exports = router;
