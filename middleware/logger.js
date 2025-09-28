// Request logging middleware
const logger = (req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${
      req.get("Origin") || "No Origin"
    }`
  );
  next();
};

module.exports = logger;
