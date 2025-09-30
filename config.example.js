// Configuration example file
// Copy this to config.js and update with your settings

module.exports = {
  // Server port
  PORT: process.env.PORT || 4000,

  // CORS allowed origins
  // Add your production domains here
  ALLOWED_ORIGINS: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173", // Vite default
    "http://localhost:8080", // Vue CLI default
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080",
    // Add your production domains here
    // 'https://yourdomain.com',
    // 'https://www.yourdomain.com',
  ],

  // Environment
  NODE_ENV: process.env.NODE_ENV || "development",
};
