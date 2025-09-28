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

3. **Server will start on:** `http://localhost:3001`

**Production server:** `https://express-mock-server-rose.vercel.app`

## API Endpoints

### Health Check

- `GET /health` - Server health status
- `GET /hi` - Simple greeting endpoint

### D - Learning

- `GET /api/classes` - Get all upcoming classes
- `GET /api/assignments` - Get all assignments
- `GET /api/tests` - Get all shared tests
- `GET /api/courses` - Get all enrolled courses

### Static Assets

- `GET /assets/teacher-profiles/*` - Serve teacher profile images

## CORS Configuration

The server includes a CORS whitelist that only allows requests from approved domains. By default, it includes common development ports:

To add your production domains, edit the `allowedOrigins` array in `server.js`:

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
NODE_ENV=development
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

## Author

- **[Devi R](https://www.linkedin.com/in/devi-r-06bb94a7)**
