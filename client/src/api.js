const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||
      origin.endsWith(".vercel.app") ||
      origin === "http://localhost:5173"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

const urlRoutes = require("./routes/urlRoutes");
app.use("/", urlRoutes);

module.exports = app;
