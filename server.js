const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import configurations and middleware
const corsOptions = require("./config/cors");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const hiRoutes = require("./routes/hi");
const healthRoutes = require("./routes/health");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Serve static assets
app.use("/assets", express.static("projects/post-login-dashboard/assets"));

// Default route
app.get("/", (req, res) => {
  res.json({
    name: "Devi R",
    email: "devi.frontend@gmail.com",
    linkedin: "https://www.linkedin.com/in/devi-r-06bb94a7/",
  });
});

// Routes
app.use("/hi", hiRoutes);
app.use("/health", healthRoutes);
app.use(
  "/api/post-login-dashboard/section-a",
  require("./projects/post-login-dashboard/routes/section-a")
);
app.use(
  "/api/post-login-dashboard/section-b",
  require("./projects/post-login-dashboard/routes/section-b")
);
app.use(
  "/api/post-login-dashboard/section-c",
  require("./projects/post-login-dashboard/routes/section-c")
);
app.use(
  "/api/post-login-dashboard/section-d",
  require("./projects/post-login-dashboard/routes/section-d")
);
app.use(
  "/api/post-login-dashboard/config",
  require("./projects/post-login-dashboard/routes/config")
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on port ${PORT}`);
  console.log(
    `\n🌐 Production server: https://express-mock-server-rose.vercel.app`
  );
});

module.exports = app;
