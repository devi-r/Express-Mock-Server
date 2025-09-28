const express = require("express");
const router = express.Router();
const { getUpcomingClasses } = require("../data/classes");

// GET /classes - Get all upcoming classes
router.get("/", (req, res) => {
  // Determine if we're in production based on host or environment
  const isProduction =
    req.get("host")?.includes("vercel.app") ||
    process.env.NODE_ENV === "production";
  const upcomingClasses = getUpcomingClasses(isProduction);

  res.json({
    success: true,
    data: upcomingClasses,
    count: upcomingClasses.length,
  });
});

module.exports = router;
