const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// MIDDLEWARE
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Route is working! YeY");
});

module.exports = app;
