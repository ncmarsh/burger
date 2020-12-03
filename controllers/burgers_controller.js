const express = require("express");
const router = express.Router();

// Import model to use its database functions
const burger = require("../models/burger");

// routes - get/post/put

// Export routes for server.js to use
module.exports = router;