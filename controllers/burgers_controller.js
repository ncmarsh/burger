const express = require("express");
const { selectAll, insertOne, updateOne } = require("../config/orm");
const router = express.Router();

// Import model to use its database functions
const burger = require("../models/burger.js");

// Routes
// Show all the burgers
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        res.render("index", { burger: data });
    });
});

// Add new burger from user input
router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, 0], function(result) {
        res.json({id: result.insertId});
    });
});

// Update burger when eaten
router.put("/api/burgers/:id", function(req, res) {
    let eaten = "id = " + req.params.id;

    burger.updateOne(
        {
            devoured: req.body.devoured
        },
        eaten,
        function(result) {
            if (result.changedRows === 0) {
                // If no rows were changed, Id does not exist, is 404
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

// Export routes for server.js to use
module.exports = router;