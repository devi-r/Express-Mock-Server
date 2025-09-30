const express = require("express");
const router = express.Router();
const { getDataByProductType } = require("../data/section-b");

// GET /section-b - Get all assignments for Section B
router.get("/", (req, res) => {
  // Get product_type from query parameter, default to 'learning'
  const productType = req.query.product_type || "learning";

  const sectionBData = getDataByProductType(productType);

  res.json({
    success: true,
    data: sectionBData,
    count: sectionBData.length,
    product_type: productType,
  });
});

module.exports = router;
