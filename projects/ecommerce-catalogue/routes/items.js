const express = require("express");
const router = express.Router();
const menData = require("../data/men.json");
const womenData = require("../data/women.json");
const boysData = require("../data/boys.json");
const girlsData = require("../data/girls.json");

/**
 * Helper function to parse comma-separated query params into an array
 */
const parseMultiSelectParam = (param) => {
  if (!param) return null;
  return param.split(",").map((item) => item.trim());
};

/**
 * Helper function to parse price range string (e.g., "25-1000" or "25.0 TO 1000.0")
 */
const parsePriceRange = (rangeStr) => {
  let min, max;

  if (rangeStr.includes(" TO ")) {
    // Handle "25.0 TO 1000.0" format
    [min, max] = rangeStr.split(" TO ").map((num) => parseFloat(num.trim()));
  } else {
    // Handle "25-1000" format
    [min, max] = rangeStr.split("-").map((num) => parseFloat(num.trim()));
  }

  return { min, max: max || Infinity };
};

/**
 * Helper function to parse discount range string (e.g., "10-100" or "10.0 TO 100.0")
 * Note: Discount values in data are already percentages (0-8200), not 0-100
 */
const parseDiscountRange = (rangeStr) => {
  let min, max;

  if (rangeStr.includes(" TO ")) {
    // Handle "10.0 TO 100.0" format
    [min, max] = rangeStr.split(" TO ").map((num) => parseFloat(num.trim()));
  } else {
    // Handle "10-100" format
    [min, max] = rangeStr.split("-").map((num) => parseFloat(num.trim()));
  }

  return { min, max: max || 100 };
};

/**
 * Helper function to remove duplicate items based on productId using Map
 * More efficient than Set-based approach
 */
const removeDuplicates = (items) => {
  const seen = new Map();
  const originalLength = items.length;
  const filtered = items.filter((item) => {
    // If the map doesn't have the productId, it's a new unique item.
    // Add it to the map and keep it in the array.
    if (!seen.has(item.productId)) {
      seen.set(item.productId, true);
      return true;
    }
    // If the map already has the productId, it's a duplicate.
    return false;
  });
  return filtered;
};

/**
 * Helper function to sort items based on sort type
 */
const sortItems = (items, sortType) => {
  if (!sortType) return items;

  const sortTypeLower = sortType.toLowerCase();

  switch (sortTypeLower) {
    case "popularity":
      // Sort by rating count (number of reviews) descending
      return items.sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0));

    case "trending":
      // Sort by isFastFashion (true first), then by rating descending
      return items.sort((a, b) => {
        if (a.isFastFashion !== b.isFastFashion) {
          return b.isFastFashion ? 1 : -1; // true comes before false
        }
        return (b.rating || 0) - (a.rating || 0);
      });

    case "recommended":
      // Sort by isPersonalised (true first), then by rating descending
      return items.sort((a, b) => {
        if (a.isPersonalised !== b.isPersonalised) {
          return b.isPersonalised ? 1 : -1; // true comes before false
        }
        return (b.rating || 0) - (a.rating || 0);
      });

    case "price_low_to_high":
      return items.sort((a, b) => (a.price || 0) - (b.price || 0));

    case "price_high_to_low":
      return items.sort((a, b) => (b.price || 0) - (a.price || 0));

    case "discount_high_to_low":
      return items.sort((a, b) => (b.discount || 0) - (a.discount || 0));

    case "newest":
      // Sort by productId descending (assuming higher IDs are newer)
      return items.sort((a, b) => (b.productId || 0) - (a.productId || 0));

    default:
      // Return items as-is for unknown sort types
      return items;
  }
};

// GET /api/ecommerce/items - Get all items with optional filters and pagination
router.get("/", (req, res) => {
  const {
    gender,
    category,
    brand,
    price_range,
    color,
    discount_range,
    sort = "recommended", // Default to recommended sorting
    page = 1,
    pageSize = 20,
  } = req.query;

  try {
    let allItems = [];

    // Step 1: Filter by gender or get all items
    if (!gender) {
      allItems = [
        ...menData.data,
        ...womenData.data,
        ...boysData.data,
        ...girlsData.data,
      ];
    } else {
      const genderLower = gender.toLowerCase();

      switch (genderLower) {
        case "men":
          allItems = [...menData.data];
          break;
        case "women":
          allItems = [...womenData.data];
          break;
        case "boys":
          allItems = [...boysData.data];
          break;
        case "girls":
          allItems = [...girlsData.data];
          break;
        default:
          return res.status(400).json({
            success: false,
            message: `Invalid gender filter. Valid values are: men, women, boys, girls`,
          });
      }
    }

    // Step 2: Apply additional filters
    let filteredItems = allItems;

    // Filter by category (multiselect)
    if (category) {
      const categories = parseMultiSelectParam(category);
      filteredItems = filteredItems.filter((item) =>
        categories.includes(item.category)
      );
    }

    // Filter by brand (multiselect)
    if (brand) {
      const brands = parseMultiSelectParam(brand);
      filteredItems = filteredItems.filter((item) =>
        brands.includes(item.brand)
      );
    }

    // Filter by color (multiselect)
    if (color) {
      const colors = parseMultiSelectParam(color);
      filteredItems = filteredItems.filter((item) =>
        colors.includes(item.primaryColour)
      );
    }

    // Filter by price_range (multiselect - multiple ranges)
    if (price_range) {
      const priceRanges =
        parseMultiSelectParam(price_range).map(parsePriceRange);
      filteredItems = filteredItems.filter((item) => {
        return priceRanges.some(
          (range) => item.price >= range.min && item.price <= range.max
        );
      });
    }

    // Filter by discount_range (single select)
    if (discount_range) {
      const discountRange = parseDiscountRange(discount_range);
      filteredItems = filteredItems.filter((item) => {
        // Calculate discount percentage from discount amount and mrp
        const discountPercentage = (item.discount / item.mrp) * 100;
        return (
          discountPercentage >= discountRange.min &&
          discountPercentage <= discountRange.max
        );
      });
    }

    // Step 2.5: Remove duplicates after filtering
    filteredItems = removeDuplicates(filteredItems);

    // Step 3: Apply sorting
    const sortedItems = sortItems(filteredItems, sort);

    // Step 4: Apply pagination
    const pageNum = parseInt(page, 10);
    const pageSizeNum = parseInt(pageSize, 10);

    // Validate pagination parameters
    if (pageNum < 1 || pageSizeNum < 1 || pageSizeNum > 100) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid pagination parameters. Page must be >= 1, pageSize must be between 1-100",
      });
    }

    const totalItems = sortedItems.length;
    const totalPages = Math.ceil(totalItems / pageSizeNum);
    const startIndex = (pageNum - 1) * pageSizeNum;
    const endIndex = startIndex + pageSizeNum;
    const paginatedItems = sortedItems.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: paginatedItems.length,
      totalCount: totalItems,
      pagination: {
        currentPage: pageNum,
        pageSize: pageSizeNum,
        totalPages: totalPages,
        hasNextPage: pageNum < totalPages,
        hasPreviousPage: pageNum > 1,
        nextPage: pageNum < totalPages ? pageNum + 1 : null,
        previousPage: pageNum > 1 ? pageNum - 1 : null,
      },
      filters: {
        gender: gender || "all",
        category: category || null,
        brand: brand || null,
        color: color || null,
        price_range: price_range || null,
        discount_range: discount_range || null,
        sort: sort || null,
      },
      data: paginatedItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching items",
      error: error.message,
    });
  }
});

module.exports = router;
