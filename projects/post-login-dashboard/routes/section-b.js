const express = require("express");
const router = express.Router();
const { getDataByProductType } = require("../data/section-b");

// GET /section-b - Get all data for Section B
router.get("/", (req, res) => {
  // Get product_type from query parameter, default to 'design'
  const productType = req.query.product_type || "design";

  const sectionBData = getDataByProductType(productType);

  res.json({
    success: true,
    data: sectionBData,
    count: sectionBData.length,
    product_type: productType,
  });
});

module.exports = router;
