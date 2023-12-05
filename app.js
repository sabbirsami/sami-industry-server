const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const applyMiddleware = require("./src/middleware");
const connectDB = require("./src/db/connectDB");
const {
    getAllProduct,
    getSingleProduct,
} = require("./src/router/productHandler");
const { getAllReviews } = require("./src/router/reviewHandler");
const {
    getAllOrders,
    postAOrder,
    getUserOrders,
} = require("./src/router/orderHandler");
const { getAllUsers } = require("./src/router/userHandler");

// MIDDLEWARE
applyMiddleware(app);

// GET ALL PRODUCTS
app.get("/products", getAllProduct);

// GET A SINGLE PRODUCT
app.get("/product/:id", getSingleProduct);
// GET ALL REVIEWS
app.get("/reviews", getAllReviews);
// GET A SINGLE REVIEWS
app.get("/reviews", getAllReviews);

// GET ALL ORDERS
app.get("/orders", getAllOrders);
// POST A ORDER INFO
app.post("/orders", postAOrder);
// GET A USER ORDERS INFO
app.get("/orders/my-order/:email", getUserOrders);
// GET USER INFO
app.post("/admin/:email", getAllUsers);

//APPLICATION ROUTE

app.get("/", (req, res) => {
    res.send("Industry Running...");
});

const main = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log("Industry running on port: ", { port });
    });
};

main();
