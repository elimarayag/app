// MongoDB
require("./config/db");

const express = require("express");
const cors = require("cors");
const routes = require("./routes"); // Ensure this exports valid routes

// Create server app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json directly

// Routes
app.use("/api/v1", routes);  // Prefix for your routes

// Export the app
module.exports = app;