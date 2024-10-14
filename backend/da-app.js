const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, "../frontend/build")));

// API routes - keep these for your backend functionality
// Example: app.get("/api/users", ... )
app.get("/payroll", (req, res) => {
    res.json({ message: "There's no such thing as payroll." });
  });

// Catch-all route to serve React's index.html for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
