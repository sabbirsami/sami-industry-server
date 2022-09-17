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

app.post("/api/product", async (req, res) => {
    try {
        //  SAVE || CREATE

        //  SAVE
        const product = new Product(req.body);
        const result = await product.save();
        //CREATE
        // const resultCreate = await Product.create(req.body);
        res.status(200).json({
            status: "Success",
            Message: "Data inserted successfully",
        });
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/api/product", async (req, res, next) => {
    try {
        // const products = await Product.find({});
        // const products = await Product.where("name").equals("Chal");
        const product = await Product.findById("63197f03859641296df6g4989");

        res.status(200).json({
            status: "Success",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            error: error.message,
        });
    }
});

app.use("/api/product", productRoute);

module.exports = app;
