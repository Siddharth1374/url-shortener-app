import { useState } from "react";
import API from "../api";

const isValidUrl = (string) => {
  try {
    const u = new URL(string);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

const UrlForm = ({ setResult }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    // Here Frontend validation
    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    if (!isValidUrl(url.trim())) {
      setError("Invalid URL. Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/shorten", {
        originalUrl: url.trim()
      });
      setResult(res.data);
      setUrl("");
    } catch (err) {
      // here Show backend error message if available
      const msg = err?.response?.data?.error || "Error shortening URL";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter URL like https://example.com"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setError(""); }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {/* Error message box */}
      {error && (
        <p style={{
          color: "#ff4444",
          background: "rgba(255,68,68,0.1)",
          border: "1px solid rgba(255,68,68,0.3)",
          borderRadius: "8px",
          padding: "10px 14px",
          fontSize: "14px",
          marginTop: "12px"
        }}>
          ❌ {error}
        </p>
      )}
    </div>
  );
};

export default UrlForm;