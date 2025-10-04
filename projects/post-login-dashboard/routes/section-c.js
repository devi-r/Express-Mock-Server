const express = require("express");
const router = express.Router();
const { getDataByProductType } = require("../data/section-c");

// GET /section-c - Get all data for Section C
router.get("/", (req, res) => {
  // Get product_type from query parameter, default to 'design'
  const productType = req.query.product_type || "design";

  const sectionCData = getDataByProductType(productType);

  res.json({
    success: true,
    data: sectionCData,
    count: sectionCData.length,
    product_type: productType,
  });
});

module.exports = router;
