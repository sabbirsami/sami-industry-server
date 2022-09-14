const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// schema design

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name for this product"], // 2st one is error message
            trim: true, // trim means if user put extra space it will clear this space
            unique: true,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [100, "Name is too large"],
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: [0, "Price can't be negative"],
        },
        unit: {
            type: String,
            required: true,
            enum: {
                values: ["kg", "litre", "pcs"],
                message: "Unit value can't be {VALUE} must be kg/litre/pcs",
            },
        },
        quantity: {
            type: Number,
            required: true,
            min: [0, "Quantity can't be negative"],
            validate: {
                validator: (value) => {
                    const isInteger = Number.isInteger(value);
                    if (isInteger) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
            message: "Quantity must be an integer",
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["in-stock", "out-of-stock", "discontinued"],
                message: "status can't be {VALUE}",
            },
        },
        // createAt: {
        //     type: Date,
        //     default: Date.now,
        // },
        // updateAt: {
        //     type: Date,
        //     default: Date.now,
        // },
    },
    {
        timestamps: true,
    }
);

// Mongoose middleware for saving data : pre/ post

productSchema.pre("save", function (next) {
    console.log("Before saving data");
    if (this.quantity === 0) {
        this.status = "out-of-stock";
    }
    next();
});
productSchema.post("save", function (doc, next) {
    console.log("Before saving data");
    next();
});

// SCHEMA -> MODEL -> QUERY
const Product = mongoose.model("Product", productSchema); // Model name first word must be uppercase

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

module.exports = app;
