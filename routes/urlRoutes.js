const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  redirectUrl
} = require("../controllers/urlController");

const rateLimiter = require("../middleware/rateLimiter");

// POST: Create short URL
router.post("/shorten", rateLimiter, createShortUrl);

// GET: Redirect
router.get("/:code", redirectUrl);

module.exports = router;