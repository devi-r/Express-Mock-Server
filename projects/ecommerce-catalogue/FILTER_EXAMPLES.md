# Filter Examples & Usage Guide

## Overview

The items API supports 6 different filter types that can be combined to get precise product results.

## Filter Types

### 1. Gender Filter (Single Select)

```bash
# Get men's items
curl "http://localhost:4000/api/ecommerce/items?gender=men"

# Get women's items
curl "http://localhost:4000/api/ecommerce/items?gender=women"
```

### 2. Category Filter (Multi-Select)

```bash
# Single category
curl "http://localhost:4000/api/ecommerce/items?category=Headphones"

# Multiple categories (comma-separated)
curl "http://localhost:4000/api/ecommerce/items?category=Headphones,Smart%20Watches,Casual%20Shoes"
```

### 3. Brand Filter (Multi-Select)

```bash
# Single brand
curl "http://localhost:4000/api/ecommerce/items?brand=boAt"

# Multiple brands (comma-separated)
curl "http://localhost:4000/api/ecommerce/items?brand=boAt,Nike,Puma,Adidas"
```

### 4. Color Filter (Multi-Select)

```bash
# Single color
curl "http://localhost:4000/api/ecommerce/items?color=Black"

# Multiple colors (comma-separated)
curl "http://localhost:4000/api/ecommerce/items?color=Black,White,Blue,Red"
```

### 5. Price Range Filter (Multi-Select)

Format: `min-max` where both min and max are numbers

```bash
# Single price range
curl "http://localhost:4000/api/ecommerce/items?price_range=25-1000"

# Multiple price ranges (comma-separated)
curl "http://localhost:4000/api/ecommerce/items?price_range=25-1000,1000-3500,3500-10000"
```

### 6. Discount Range Filter (Single Select)

Format: `min-max` where both min and max are numbers

```bash
# Items with discount between 10% and 100%
curl "http://localhost:4000/api/ecommerce/items?discount_range=10-100"

# Items with discount between 1000 and 2000 (absolute discount)
curl "http://localhost:4000/api/ecommerce/items?discount_range=1000-2000"
```

## Combining Filters

All filters can be combined using the `&` operator:

```bash
# Men's black headphones from boAt brand in price range 25-1000
curl "http://localhost:4000/api/ecommerce/items?gender=men&category=Headphones&brand=boAt&color=Black&price_range=25-1000"

# Women's items in categories Dress or Kurta, colors Black or Blue, price 500-3000
curl "http://localhost:4000/api/ecommerce/items?gender=women&category=Dress,Kurta&color=Black,Blue&price_range=500-3000"

# Items with 20%+ discount, multiple brands, specific price range
curl "http://localhost:4000/api/ecommerce/items?brand=Nike,Adidas,Puma&price_range=1000-5000&discount_range=20-100"
```

## Response Format

All requests return a consistent JSON response:

```json
{
  "success": true,
  "count": 15,
  "filters": {
    "gender": "men",
    "category": "Headphones",
    "brand": "boAt",
    "color": "Black",
    "price_range": "25-1000",
    "discount_range": null
  },
  "data": [
    {
      "productId": 18238466,
      "product": "Product Name",
      "brand": "boAt",
      "category": "Headphones",
      "primaryColour": "Black",
      "price": 899,
      "discount": 1591,
      "rating": 4.0,
      ...
    }
  ]
}
```

## Key Features

- **Multi-Select Support**: Use comma-separated values for `category`, `brand`, `color`, and `price_range`
- **Single Select**: `gender` and `discount_range` accept single values only
- **URL Encoding**: Remember to URL encode spaces and special characters (e.g., `%20` for space)
- **Case Sensitive**: Filter values are case-sensitive (e.g., `Black` not `black`)
- **Filter Transparency**: Response includes all applied filters in the `filters` object
- **Flexible Combinations**: Mix and match any filters to get exactly what you need

## Common Use Cases

### 1. Browse by Gender and Price

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=women&price_range=500-2000"
```

### 2. Find Discounted Items

```bash
curl "http://localhost:4000/api/ecommerce/items?discount_range=30-100"
```

### 3. Shop Specific Brands

```bash
curl "http://localhost:4000/api/ecommerce/items?brand=Nike,Adidas&category=Sports%20Shoes"
```

### 4. Color Preference Shopping

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&color=Black,Navy%20Blue,Grey"
```

### 5. Budget Shopping with Brand Preference

```bash
curl "http://localhost:4000/api/ecommerce/items?price_range=100-500,500-1000&brand=Roadster,H%26M"
```

## Tips

1. **Test Incrementally**: Start with one filter, then add more to refine results
2. **Check Count**: The `count` field tells you how many items match your filters
3. **Adjust Ranges**: If you get too few results, try widening price/discount ranges
4. **Multiple Ranges**: Use multiple price ranges to capture items in different price brackets
5. **Combine Wisely**: Too many specific filters might return zero results

## Error Handling

Invalid gender value:

```json
{
  "success": false,
  "message": "Invalid gender filter. Valid values are: men, women, boys, girls"
}
```

Server errors include descriptive messages:

```json
{
  "success": false,
  "message": "Error fetching items",
  "error": "Detailed error message"
}
```
