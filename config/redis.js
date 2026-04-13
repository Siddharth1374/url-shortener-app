const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

client.on("error", (err) => console.error("Redis Error:", err));
client.on("ready", () => console.log("Redis Connected"));

client.connect().catch(console.error);

module.exports = client;