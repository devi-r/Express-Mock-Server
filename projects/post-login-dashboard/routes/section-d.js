const express = require("express");
const router = express.Router();
const { getDataByProductType } = require("../data/section-d");

// GET /section-d - Get all data for Section D
router.get("/", (req, res) => {
  // Get product_type from query parameter, default to 'design'
  const productType = req.query.product_type || "design";

  const sectionDData = getDataByProductType(productType);

  res.json({
    success: true,
    data: sectionDData,
    count: sectionDData.length,
    product_type: productType,
  });
});

module.exports = router;
