# Ecommerce Catalogue API

Mock API endpoints for the React D Ecommerce Catalogue Page application.

## Data Files

The following JSON files are located in the `data/` directory:

- `filters.json` - Contains filter configuration for the catalogue
- `men.json` - Product data for men's category
- `women.json` - Product data for women's category
- `boys.json` - Product data for boys' category
- `girls.json` - Product data for girls' category

## API Endpoints

### 1. Get Filters

Returns the available filters for the catalogue.

**Endpoint:** `GET /api/ecommerce/filters`

**Response:**

```json
{
  "success": true,
  "data": {
    "gender": {
      "id": "Gender",
      "multiSelect": false,
      "filterValues": [...]
    },
    ...
  }
}
```

**Example:**

```bash
curl http://localhost:4000/api/ecommerce/filters
```

---

### 2. Get Items

Returns product items with support for multiple filters. Filters can be combined.

**Endpoint:** `GET /api/ecommerce/items`

**Query Parameters:**

| Parameter        | Type          | Description                                                                                                                          | Example                            |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| `gender`         | Single Select | Filter by gender: `men`, `women`, `boys`, `girls`                                                                                    | `gender=men`                       |
| `category`       | Multi-Select  | Filter by product category (comma-separated)                                                                                         | `category=Headphones,Casual Shoes` |
| `brand`          | Multi-Select  | Filter by brand name (comma-separated)                                                                                               | `brand=boAt,Nike,Puma`             |
| `color`          | Multi-Select  | Filter by primary color (comma-separated)                                                                                            | `color=Black,White,Blue`           |
| `price_range`    | Multi-Select  | Filter by price ranges in format `min-max` (comma-separated)                                                                         | `price_range=25-1000,1000-3500`    |
| `discount_range` | Single Select | Filter by discount range in format `min-max`                                                                                         | `discount_range=10-100`            |
| `sort`           | Single Select | Sort results by: `popularity`, `trending`, `recommended`, `price_low_to_high`, `price_high_to_low`, `discount_high_to_low`, `newest` | `sort=popularity`                  |
| `page`           | Number        | Page number for pagination (default: 1)                                                                                              | `page=2`                           |
| `pageSize`       | Number        | Number of items per page (default: 20, max: 100)                                                                                     | `pageSize=10`                      |

**Response:**

```json
{
  "success": true,
  "count": 20,
  "totalCount": 50,
  "pagination": {
    "currentPage": 1,
    "pageSize": 20,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "nextPage": 2,
    "previousPage": null
  },
  "filters": {
    "gender": "men",
    "category": "Headphones,Casual Shoes",
    "brand": "boAt",
    "color": "Black,White",
    "price_range": "25-1000",
    "discount_range": "10-50",
    "sort": "popularity"
  },
  "data": [
    {
      "productId": 18238466,
      "product": "Product Name",
      "brand": "Brand Name",
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

**Examples:**

Get all items:

```bash
curl http://localhost:4000/api/ecommerce/items
```

Filter by gender:

```bash
curl http://localhost:4000/api/ecommerce/items?gender=men
```

Filter by multiple categories:

```bash
curl "http://localhost:4000/api/ecommerce/items?category=Headphones,Smart%20Watches"
```

Filter by brand and gender:

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&brand=boAt"
```

Filter by multiple brands:

```bash
curl "http://localhost:4000/api/ecommerce/items?brand=boAt,Nike,Puma"
```

Filter by color:

```bash
curl "http://localhost:4000/api/ecommerce/items?color=Black,White"
```

Filter by price range:

```bash
curl "http://localhost:4000/api/ecommerce/items?price_range=25-1000"
```

Filter by multiple price ranges:

```bash
curl "http://localhost:4000/api/ecommerce/items?price_range=25-1000,1000-3500"
```

Filter by discount range:

```bash
curl "http://localhost:4000/api/ecommerce/items?discount_range=10-100"
```

Combine multiple filters:

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&category=Headphones&brand=boAt&price_range=25-1000&color=Black"
```

Sort by popularity:

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&sort=popularity"
```

Sort by trending:

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=women&sort=trending"
```

Sort by recommended:

```bash
curl "http://localhost:4000/api/ecommerce/items?sort=recommended"
```

Sort by price (low to high):

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&sort=price_low_to_high"
```

Sort by price (high to low):

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&sort=price_high_to_low"
```

Sort by discount (highest first):

```bash
curl "http://localhost:4000/api/ecommerce/items?sort=discount_high_to_low"
```

Sort by newest:

```bash
curl "http://localhost:4000/api/ecommerce/items?sort=newest"
```

Combine filters with sorting:

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&category=Headphones&sort=popularity"
```

Pagination examples:

```bash
# Get first page (default pageSize=20)
curl "http://localhost:4000/api/ecommerce/items?gender=men&page=1"

# Get second page with 10 items per page
curl "http://localhost:4000/api/ecommerce/items?gender=men&page=2&pageSize=10"

# Get third page with custom page size
curl "http://localhost:4000/api/ecommerce/items?gender=men&page=3&pageSize=15"
```

Combine filters, sorting, and pagination:

```bash
curl "http://localhost:4000/api/ecommerce/items?gender=men&category=Headphones&sort=popularity&page=2&pageSize=10"
```

## Error Handling

Invalid gender filter:

```json
{
  "success": false,
  "message": "Invalid gender filter. Valid values are: men, women, boys, girls"
}
```

Server error:

```json
{
  "success": false,
  "message": "Error fetching items",
  "error": "Error message"
}
```
