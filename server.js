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
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Serve static assets
app.use("/assets", express.static("d-learning/assets"));

// Routes
app.use("/hi", hiRoutes);
app.use("/health", healthRoutes);
app.use("/api/classes", require("./d-learning/routes/classes"));
app.use("/api/assignments", require("./d-learning/routes/assignments"));
app.use("/api/tests", require("./d-learning/routes/tests"));
app.use("/api/courses", require("./d-learning/routes/courses"));

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
  console.log(`👋 Hi endpoint: http://localhost:${PORT}/hi`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`\nD-Learning APIs:`);
  console.log(`   Classes: http://localhost:${PORT}/api/classes`);
  console.log(`   Assignments: http://localhost:${PORT}/api/assignments`);
  console.log(`   Tests: http://localhost:${PORT}/api/tests`);
  console.log(`   Courses: http://localhost:${PORT}/api/courses`);
});

module.exports = app;
