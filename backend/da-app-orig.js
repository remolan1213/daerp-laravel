const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "index.html"));
});

app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(express.static(path.join(__dirname, "../frontend/js")));
app.use(express.static(path.join(__dirname, "../frontend/assets/png")));
app.use(express.static(path.join(__dirname, "../frontend/assets/svg")));
// Define your routes here
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "index.html"));
});
app.get("/payroll", (req, res) => {
  // Handle GET request for /api/users
  res.sendFile(path.join(__dirname, "../frontend/views", "payroll.html"));
});

// app.post("/api/users", (req, res) => {
//   // Handle POST request for /api/users
//   res.send("Create a new user");
// });

app.get("/profile", (req, res, next) => {
  const filePath = path.join(__dirname, "../frontend/views", "profile.html");

  res.sendFile(filePath, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File not found error
        console.error(`File not found: ${filePath}`);
        return res
          .status(403)
          .send("You are not allowed to access this module.");
      }
      // Other errors
      next(err); // Pass the error to the next middleware
    }
  });
});

app.get("/settings", (req, res, next) => {
  const filePath = path.join(__dirname, "../frontend/views", "settings.html");

  res.sendFile(filePath, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File not found error
        console.error(`File not found: ${filePath}`);
        return res
          .status(403)
          .send("You are not allowed to access this module.");
      }
      // Other errors
      next(err); // Pass the error to the next middleware
    }
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
