// Request logging middleware
const logger = (req, res, next) => {
  next();
};

module.exports = logger;
