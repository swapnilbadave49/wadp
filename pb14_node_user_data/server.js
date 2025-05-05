const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Serve static files from /public
app.use(express.static("public"));

// API route to get users
app.get("/api/users", (req, res) => {
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read user data." });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
