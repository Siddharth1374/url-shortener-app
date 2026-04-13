const redisClient = require("../config/redis");

const RATE_LIMIT = 10; // requests
const WINDOW = 60; // seconds

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;

  const key = `rate:${ip}`;
  const current = await redisClient.get(key);

  if (current && parseInt(current) >= RATE_LIMIT) {
    return res.status(429).json({ message: "Too many requests" });
  }

  if (current) {
    await redisClient.incr(key);
  } else {
    await redisClient.set(key, 1, { EX: WINDOW });
  }

  next();
};

module.exports = rateLimiter;