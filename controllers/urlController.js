const Url = require("../models/Url");
const redisClient = require("../config/redis");
const { nanoid } = require("nanoid");

//  URL validator
const isValidUrl = (string) => {
  try {
    const u = new URL(string);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

// Create Short URL
exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    //We Check if URL is provided
    if (!originalUrl || !originalUrl.trim()) {
      return res.status(400).json({ error: "Please enter a URL." });
    }

    // We Check if URL is valid
    if (!isValidUrl(originalUrl.trim())) {
      return res.status(400).json({ error: "Invalid URL. Please enter a valid URL starting with http:// or https://" });
    }

    const shortCode = nanoid(7);
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    const newUrl = await Url.create({ originalUrl: originalUrl.trim(), shortCode });
    res.json({ shortUrl, originalUrl: originalUrl.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Redirect
exports.redirectUrl = async (req, res) => {
  const { code } = req.params;
  console.log("Redirect hit for code:", code);

  try {
    const cached = await redisClient.get(code);
    console.log("Cached value:", cached);
    if (cached) return res.redirect(cached);

    const url = await Url.findOne({ shortCode: code });
    console.log("DB result:", url);
    if (!url) return res.status(404).json({ message: "Not found" });

    await redisClient.set(code, url.originalUrl, { EX: 3600 });
    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};