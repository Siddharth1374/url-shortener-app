const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
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
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// HERE Handle preflight requests
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());

const urlRoutes = require("./routes/urlRoutes");
app.use("/", urlRoutes);

module.exports = app;
