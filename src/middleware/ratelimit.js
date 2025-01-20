const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 100, // 100 req per min
  standardHeaders: true,
  message: {
    code: 429,
    error: "Too Many Requests",
    message: "You have exceeded the rate limit. Please try again later.",
  },
});

module.exports = limiter;
