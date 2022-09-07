const express = require("express");
const router = express.Router();

router
    .route("/")
    .get((req, res) => {
        res.send("products found");
    })
    .post((req, res) => {
        res.send("products added");
    });

module.exports = router;
