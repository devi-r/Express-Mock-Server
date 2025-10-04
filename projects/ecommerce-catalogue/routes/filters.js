const express = require("express");
const router = express.Router();
const filters = require("../data/filters.json");
const menData = require("../data/men.json");
const womenData = require("../data/women.json");
const boysData = require("../data/boys.json");
const girlsData = require("../data/girls.json");

/**
 * Helper function to remove duplicate filter values based on id using Map
 * More efficient than Set-based approach
 */
const removeDuplicateFilterValues = (filterValues) => {
  const seen = new Map();
  return filterValues.filter((item) => {
    // If the map doesn't have the id, it's a new unique item.
    // Add it to the map and keep it in the array.
    if (!seen.has(item.id)) {
      seen.set(item.id, true);
      return true;
    }
    // If the map already has the id, it's a duplicate.
    return false;
  });
};

/**
 * Helper function to generate dynamic filter values from actual data
 */
const generateDynamicFilters = () => {
  // Combine all items
  const allItems = [
    ...menData.data,
    ...womenData.data,
    ...boysData.data,
    ...girlsData.data,
  ];

  // Remove duplicates
  const uniqueItems = allItems.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.productId === item.productId)
  );

  // Generate dynamic filter values
  const dynamicFilters = { ...filters };

  // Generate category filter values
  const categories = [...new Set(uniqueItems.map((item) => item.category))];
  dynamicFilters.category.filterValues = categories.map((category) => ({
    id: category,
    value: category,
    count: uniqueItems.filter((item) => item.category === category).length,
    meta: "",
    pLevel: "",
  }));

  // Generate brand filter values
  const brands = [...new Set(uniqueItems.map((item) => item.brand))];
  dynamicFilters.brand.filterValues = brands.map((brand) => ({
    id: brand,
    value: brand,
    count: uniqueItems.filter((item) => item.brand === brand).length,
    meta: "",
    pLevel: "",
  }));

  // For colors, we need to include all colors from original filters.json
  // but only show counts for colors that exist in unique items
  const availableColors = [
    ...new Set(uniqueItems.map((item) => item.primaryColour)),
  ];

  // Get all colors from original filters.json
  const allOriginalColors = filters.primaryColour.filterValues;

  // Create color filter values with counts only for available colors
  dynamicFilters.primaryColour.filterValues = allOriginalColors.map(
    (colorObj) => {
      const isAvailable = availableColors.includes(colorObj.id);
      return {
        id: colorObj.id,
        value: colorObj.value,
        count: isAvailable
          ? uniqueItems.filter((item) => item.primaryColour === colorObj.id)
              .length
          : 0,
        meta: colorObj.meta || "", // Use hex code from original filters.json
        pLevel: colorObj.pLevel || "",
      };
    }
  );

  // Remove duplicates from all filter values
  Object.keys(dynamicFilters).forEach((key) => {
    if (dynamicFilters[key].filterValues) {
      dynamicFilters[key].filterValues = removeDuplicateFilterValues(
        dynamicFilters[key].filterValues
      );
    }
  });

  return dynamicFilters;
};

// GET /api/ecommerce/filters - Get all filters with deduplication
router.get("/", (req, res) => {
  try {
    const dynamicFilters = generateDynamicFilters();

    res.json({
      success: true,
      data: dynamicFilters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating filters",
      error: error.message,
    });
  }
});

module.exports = router;
