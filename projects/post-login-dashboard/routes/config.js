const express = require("express");
const router = express.Router();
const { getDataByProductType } = require("../data/config");

// GET /config - Get all config
router.get("/", (req, res) => {
  // Get product_type from query parameter, default to 'learning'
  const productType = req.query.product_type || "design";

  const config = getDataByProductType(productType);

  res.json({
    success: true,
    data: config,
    product_type: productType,
  });
});

module.exports = router;
