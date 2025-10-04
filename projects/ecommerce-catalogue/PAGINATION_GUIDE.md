# Pagination Guide

## Overview

The items API supports pagination to efficiently handle large datasets. Pagination is applied after filtering and sorting operations, ensuring consistent results across pages.

## Pagination Parameters

### `page` (Number)

- **Description:** Page number to retrieve
- **Default:** 1
- **Range:** 1 to totalPages
- **Example:** `page=2`

### `pageSize` (Number)

- **Description:** Number of items per page
- **Default:** 20
- **Range:** 1 to 100
- **Example:** `pageSize=10`

## Response Format

Pagination information is included in the response:

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
  "filters": { ... },
  "data": [ ... ]
}
```

## Pagination Fields Explained

| Field             | Type        | Description                                     |
| ----------------- | ----------- | ----------------------------------------------- |
| `count`           | Number      | Number of items in current page                 |
| `totalCount`      | Number      | Total number of items after filtering           |
| `currentPage`     | Number      | Current page number                             |
| `pageSize`        | Number      | Items per page                                  |
| `totalPages`      | Number      | Total number of pages                           |
| `hasNextPage`     | Boolean     | Whether there's a next page                     |
| `hasPreviousPage` | Boolean     | Whether there's a previous page                 |
| `nextPage`        | Number/null | Next page number (null if no next page)         |
| `previousPage`    | Number/null | Previous page number (null if no previous page) |

## Usage Examples

### Basic Pagination

```bash
# Get first page (default pageSize=20)
curl "http://localhost:4000/api/ecommerce/items?gender=men&page=1"

# Get second page
curl "http://localhost:4000/api/ecommerce/items?gender=men&page=2"

# Get last page
curl "http://localhost:4000/api/ecommerce/items?gender=men&page=3"
```

### Custom Page Size

```bash
# 10 items per page
curl "http://localhost:4000/api/ecommerce/items?gender=men&pageSize=10"

# 5 items per page
curl "http://localhost:4000/api/ecommerce/items?gender=men&pageSize=5"

# Maximum page size
curl "http://localhost:4000/api/ecommerce/items?gender=men&pageSize=100"
```

### Combined with Filters

```bash
# Filtered results with pagination
curl "http://localhost:4000/api/ecommerce/items?gender=men&category=Headphones&page=1&pageSize=5"

# Multiple filters with pagination
curl "http://localhost:4000/api/ecommerce/items?gender=women&brand=Nike,Adidas&color=Black&page=2&pageSize=10"
```

### Combined with Sorting

```bash
# Sorted results with pagination
curl "http://localhost:4000/api/ecommerce/items?gender=men&sort=popularity&page=1&pageSize=15"

# Price-sorted results with pagination
curl "http://localhost:4000/api/ecommerce/items?gender=women&sort=price_low_to_high&page=2&pageSize=20"
```

### Complete Example

```bash
# All features combined
curl "http://localhost:4000/api/ecommerce/items?gender=men&category=Headphones&brand=boAt&sort=popularity&page=1&pageSize=5"
```

## Pagination Logic

1. **Filtering:** Apply all filters (gender, category, brand, etc.)
2. **Sorting:** Apply sorting algorithm
3. **Pagination:** Slice the sorted results based on page and pageSize
4. **Response:** Return paginated data with metadata

## Error Handling

### Invalid Page Number

```bash
curl "http://localhost:4000/api/ecommerce/items?page=0"
# Response: 400 Bad Request
{
  "success": false,
  "message": "Invalid pagination parameters. Page must be >= 1, pageSize must be between 1-100"
}
```

### Invalid Page Size

```bash
curl "http://localhost:4000/api/ecommerce/items?pageSize=150"
# Response: 400 Bad Request
{
  "success": false,
  "message": "Invalid pagination parameters. Page must be >= 1, pageSize must be between 1-100"
}
```

## Frontend Integration

### React Example

```javascript
const fetchItems = async (page = 1, pageSize = 20) => {
  const response = await fetch(
    `http://localhost:4000/api/ecommerce/items?gender=men&page=${page}&pageSize=${pageSize}`
  );
  const data = await response.json();

  return {
    items: data.data,
    pagination: data.pagination,
    totalCount: data.totalCount,
  };
};

// Usage
const { items, pagination, totalCount } = await fetchItems(1, 20);
console.log(`Page ${pagination.currentPage} of ${pagination.totalPages}`);
console.log(`Showing ${items.length} of ${totalCount} items`);
```

### Pagination Component

```javascript
const PaginationComponent = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages, hasNextPage, hasPreviousPage } = pagination;

  return (
    <div className="pagination">
      <button
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={!hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
```

## Performance Considerations

- **Page Size Limits:** Maximum 100 items per page to prevent large responses
- **Efficient Slicing:** Pagination is applied after filtering/sorting (not on raw data)
- **Consistent Results:** Same filters + sort + page always returns same results
- **Memory Efficient:** Only returns requested page, not entire dataset

## Best Practices

1. **Default Page Size:** Use 20 items per page for optimal UX
2. **Page Size Options:** Offer 10, 20, 50, 100 items per page
3. **Navigation:** Always show current page and total pages
4. **Loading States:** Show loading indicators during page changes
5. **URL State:** Update URL parameters when changing pages
6. **Caching:** Consider caching frequently accessed pages

## Common Use Cases

### E-commerce Product Listing

```bash
# First page of men's products, sorted by popularity
curl "http://localhost:4000/api/ecommerce/items?gender=men&sort=popularity&page=1&pageSize=20"
```

### Search Results

```bash
# Search results with pagination
curl "http://localhost:4000/api/ecommerce/items?category=Headphones&brand=boAt&page=1&pageSize=10"
```

### Mobile App (Smaller Pages)

```bash
# Mobile-optimized page size
curl "http://localhost:4000/api/ecommerce/items?gender=women&page=1&pageSize=10"
```

### Admin Dashboard (Larger Pages)

```bash
# Admin view with more items per page
curl "http://localhost:4000/api/ecommerce/items?page=1&pageSize=50"
```

## Migration from Frontend Pagination

If migrating from frontend pagination to backend pagination:

1. **Remove frontend slicing logic**
2. **Add page/pageSize parameters to API calls**
3. **Update state management to handle pagination metadata**
4. **Implement pagination UI components**
5. **Update URL handling for page state**

This backend pagination approach provides better performance, consistency, and scalability compared to frontend-only pagination.
