const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Ielādē .env failu (SPOON_KEY un PORT)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;
const SPOON_KEY = process.env.SPOON_KEY;

// statisko failu apkalpošana (index.html, script.js, style.css)
app.use(express.static(__dirname));

/**
 * GET /api/search
 * Proxy maršruts uz Spoonacular complexSearch
 * sagaida ?query=...
 */
app.get("/api/search", async (req, res) => {
  const query = req.query.query;
  const number = req.query.number || 12;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
    query
  )}&number=${number}&addRecipeInformation=true&apiKey=${SPOON_KEY}`;

  try {
    // Node 24 jau atbalsta globālu fetch
    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return res
          .status(response.status)
          .json({ error: "Upstream auth error (check API key or plan)" });
      }
      if (response.status === 429) {
        return res
          .status(response.status)
          .json({ error: "Rate limit reached at Spoonacular" });
      }
      return res
        .status(response.status)
        .json({ error: `Upstream error ${response.status}` });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Internal server error in proxy" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
