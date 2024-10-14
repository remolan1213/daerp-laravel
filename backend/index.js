const express = require("express");
const daapp = require("./da-app"); // Your existing Express app
require("dotenv").config(); // For loading environment variables
const path = require("path");
const port = process.env.DA_PORT || 4000; // Set your preferred backend port

// Start the server
daapp.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
