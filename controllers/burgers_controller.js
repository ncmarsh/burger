const express = require("express");
const { selectAll, insertOne, updateOne } = require("../config/orm");
const router = express.Router();

// Import model to use its database functions
const burger = require("../models/burger.js");

// Routes
// Show all the burgers
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        let allBurgers = { burger: data };
        console.log(allBurgers);
        res.render("index", allBurgers);
    });
});

// Add new burger from user input
router.post("/api/burgers", function(req, res) {
    console.log(req.body);
    burger.insertOne(["burger_name"], [req.body.burger_name], function(result) {
        res.json({id: result.insertId});
    });
});

// Update burger when eaten
router.put("/api/burgers/:id", function(req, res) {
    let eaten = "id = " + req.params.id;
    console.log(req.body);
    console.log("updated");

    console.log("devoured", eaten);

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