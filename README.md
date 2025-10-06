# Express Mock Server

A lightweight Node.js server using Express.js for serving mock data to the 'D frontend applications' with CORS whitelist support.

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the server:**

   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
   ```

3. **Server will start on:** `http://localhost:4000`

**Production server:** `https://express-mock-server-rose.vercel.app`

## API Endpoints

### Health Check

- `GET /health` - Server health status
- `GET /hi` - Simple greeting endpoint

### Post-Login Dashboard API

#### Configuration

- `GET /api/post-login-dashboard/config` - Get dashboard configuration
  - Query params: `product_type` (optional) - Filter by product type

#### Section Data

- `GET /api/post-login-dashboard/section-a` - Get section-a data

  - Query params: `product_type` (optional)

- `GET /api/post-login-dashboard/section-b` - Get section-b data

  - Query params: `product_type` (optional)

- `GET /api/post-login-dashboard/section-c` - Get section-c data

  - Query params: `product_type` (optional)

- `GET /api/post-login-dashboard/section-d` - Get section-d data
  - Query params: `product_type` (optional)

### Ecommerce Catalogue API

#### Filters

- `GET /api/ecommerce/filters` - Get all available filters
  - Returns: Complete filters data with dynamic counts

#### Items

- `GET /api/ecommerce/items` - Get items with filtering, sorting, and pagination
  - Query params:
    - `gender` (single select): men, women, boys, girls
    - `category` (multi-select): Headphones, Smart Watches, Casual Shoes, etc. (comma-separated)
    - `brand` (multi-select): boAt, Nike, Puma, etc. (comma-separated)
    - `color` (multi-select): Black, White, Blue, etc. (comma-separated)
    - `price_range` (multi-select): Format `min-max` e.g., `25-1000,1000-3500` (comma-separated)
    - `discount_range` (single select): Format `min-max` e.g., `10-100`
    - `sort` (single select): popularity, trending, recommended, price_low_to_high, price_high_to_low, discount_high_to_low, newest
    - `page` (number): Page number for pagination (default: 1)
    - `pageSize` (number): Items per page (default: 20, max: 100)

## Static Assets

- `GET /assets/people/*` - Serve people profile images

## CORS Configuration

The server includes a CORS whitelist that only allows requests from approved domains. By default, it includes common development ports:

To add your production domains, edit the `allowedOrigins` array in `server.js`:

```

## Development

- **Auto-restart:** `npm run dev` (uses nodemon)
- **Manual restart:** `npm start`
- **Logs:** All requests are logged with timestamp and origin

## Customization

1. **Add new endpoints:** Create new route files in `routes/` directory
2. **Modify mock data:** Update the data files in `data/` directory
3. **Add middleware:** Insert custom middleware in `middleware/` directory
4. **Database integration:** Replace mock data with database calls
5. **Add new assets:** Place static files in `assets/` directory
6. **Project specific:** Add inside projects folder

## Troubleshooting

### CORS Errors

- Check that your frontend domain is in the `allowedOrigins` array
- Verify the origin header in browser dev tools
- Check server logs for blocked requests

### Port Already in Use

- Change the `PORT` in your `.env` file
- Or kill the process using the port: `lsof -ti:3001 | xargs kill -9`
```

## Author

- **[Devi R](https://www.linkedin.com/in/devi-r-06bb94a7)**
