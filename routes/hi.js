const express = require("express");
const router = express.Router();

// GET /hi - Returns greeting message
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hi, This is Devi",
  });
});

module.exports = router;
