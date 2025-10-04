# Sorting Guide

## Overview

The items API supports 7 different sorting options that can be combined with any filters to organize product results.

## Available Sort Options

### 1. Popularity Sort

**Parameter:** `sort=popularity`
**Logic:** Sorts by `ratingCount` (number of reviews) in descending order
**Use Case:** Show most reviewed/popular items first

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&sort=popularity"
```

**Example Results:**

- Item 1: Rating Count: 21,479
- Item 2: Rating Count: 19,971
- Item 3: Rating Count: 19,552

---

### 2. Trending Sort

**Parameter:** `sort=trending`
**Logic:** Sorts by trending score = `rating × log(ratingCount)`
**Use Case:** Show items that are both highly rated and have good engagement

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=women&sort=trending"
```

**Example Results:**

- Item 1: Rating: 4.19, Count: 19,552 (Score: ~4.19 × 9.88)
- Item 2: Rating: 4.29, Count: 12,342 (Score: ~4.29 × 9.42)
- Item 3: Rating: 4.01, Count: 21,479 (Score: ~4.01 × 10.08)

---

### 3. Recommended Sort

**Parameter:** `sort=recommended`
**Logic:** Primary sort by `rating` (descending), secondary sort by `ratingCount` (descending)
**Use Case:** Show highest rated items first, with more reviews as tiebreaker

```bash
curl "http://localhost:4000/api/ecommerce/items?sort=recommended"
```

**Example Results:**

- Item 1: Rating: 4.65
- Item 2: Rating: 4.58
- Item 3: Rating: 4.51

---

### 4. Price Low to High

**Parameter:** `sort=price_low_to_high`
**Logic:** Sorts by `price` in ascending order
**Use Case:** Budget shopping, show cheapest items first

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&sort=price_low_to_high"
```

**Example Results:**

- Item 1: Price: ₹499
- Item 2: Price: ₹587
- Item 3: Price: ₹649

---

### 5. Price High to Low

**Parameter:** `sort=price_high_to_low`
**Logic:** Sorts by `price` in descending order
**Use Case:** Premium shopping, show most expensive items first

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&sort=price_high_to_low"
```

**Example Results:**

- Item 1: Price: ₹8,499
- Item 2: Price: ₹5,036
- Item 3: Price: ₹4,997

---

### 6. Discount High to Low

**Parameter:** `sort=discount_high_to_low`
**Logic:** Sorts by `discount` amount in descending order
**Use Case:** Show items with highest discounts first

```bash
curl "http://localhost:4000/api/ecommerce/items?sort=discount_high_to_low"
```

**Example Results:**

- Item 1: Discount: ₹8,200
- Item 2: Discount: ₹7,800
- Item 3: Discount: ₹7,700

---

### 7. Newest Sort

**Parameter:** `sort=newest`
**Logic:** Sorts by `productId` in descending order (assuming higher IDs are newer)
**Use Case:** Show latest arrivals first

```bash
curl "http://localhost:4000/api/ecommerce/items?sort=newest"
```

**Example Results:**

- Item 1: Product ID: 21,033,448
- Item 2: Product ID: 20,781,246
- Item 3: Product ID: 20,626,136

---

## Combining Sorting with Filters

All sorting options work seamlessly with any combination of filters:

### Example 1: Popular Headphones

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&category=Headphones&sort=popularity"
```

### Example 2: Trending Women's Items Under ₹2000

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=women&price_range=25-2000&sort=trending"
```

### Example 3: Recommended Black Items

```bash
curl "http://localhost:4000/api/ecommerce/items?color=Black&sort=recommended"
```

### Example 4: Budget Shopping with Brand Preference

```bash
curl "http://localhost:4000/api/ecommerce/items?brand=Nike,Adidas&sort=price_low_to_high"
```

### Example 5: Best Deals

```bash
curl "http://localhost:4000/api/ecommerce/items?sort=discount_high_to_low"
```

## Response Format

When sorting is applied, the response includes the sort parameter in the filters object:

```json
{
  "success": true,
  "count": 50,
  "filters": {
    "gender": "men",
    "category": null,
    "brand": null,
    "color": null,
    "price_range": null,
    "discount_range": null,
    "sort": "popularity"
  },
  "data": [
    {
      "productId": 18238466,
      "product": "Product Name",
      "rating": 4.02,
      "ratingCount": 21479,
      "price": 899,
      "discount": 1591,
      ...
    }
  ]
}
```

## Sorting Algorithm Details

### Popularity Algorithm

```javascript
// Sort by rating count descending
items.sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0));
```

### Trending Algorithm

```javascript
// Sort by trending score = rating × log(ratingCount)
items.sort((a, b) => {
  const scoreA = (a.rating || 0) * Math.log(a.ratingCount || 1);
  const scoreB = (b.rating || 0) * Math.log(b.ratingCount || 1);
  return scoreB - scoreA;
});
```

### Recommended Algorithm

```javascript
// Primary: rating descending, Secondary: ratingCount descending
items.sort((a, b) => {
  if (b.rating !== a.rating) {
    return (b.rating || 0) - (a.rating || 0);
  }
  return (b.ratingCount || 0) - (a.ratingCount || 0);
});
```

## Best Practices

1. **Default Sorting**: Use `popularity` or `recommended` for general browsing
2. **Price Shopping**: Use `price_low_to_high` for budget-conscious users
3. **Deal Hunting**: Use `discount_high_to_low` to show best offers
4. **New Arrivals**: Use `newest` to showcase latest products
5. **Quality Focus**: Use `recommended` for users prioritizing quality
6. **Engagement**: Use `trending` for items with good social proof

## Performance Notes

- Sorting is applied after all filters are processed
- Sorting operates on the filtered dataset (not the entire dataset)
- All sorting algorithms are O(n log n) complexity
- No additional database queries required

## Error Handling

Invalid sort values are ignored (items returned in original order):

```bash
curl "http://localhost:4000/api/ecommerce/items?sort=invalid_sort"
# Returns items in original order without error
```

The API gracefully handles missing sort values and continues processing normally.
