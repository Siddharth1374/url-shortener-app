require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const redisClient = require("./config/redis");

const PORT = process.env.PORT || 5000;

connectDB();

redisClient.on("ready", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});