const express = require("express");
const router = express.Router();
const { getDataByProductType } = require("../data/section-a");

// GET /section-a - Get all upcoming events for Section A
router.get("/", (req, res) => {
  // Get product_type from query parameter, default to 'design'
  const productType = req.query.product_type || "design";

  // Determine if we're in production based on host or environment
  const isProduction =
    req.get("host")?.includes("vercel.app") ||
    process.env.NODE_ENV === "production";

  const upcomingEvents = getDataByProductType(productType, isProduction);

  res.json({
    success: true,
    data: upcomingEvents,
    count: upcomingEvents.length,
    product_type: productType,
  });
});

module.exports = router;
