const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dbConnect = require("./utils/dbConnect");
const viewCount = require("./middleware/viewCount");
const { default: rateLimit } = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");
const productRoutes = require("./routes/v1/products.route");
const { connectToServer } = require("./utils/dbConnect");

app.use(cors());
app.use(express.json());
app.use(viewCount);

connectToServer((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    } else {
        console.log(err);
    }
});

app.use("/api/v1/products", productRoutes);
const limiter = rateLimitt({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized access" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.WEB_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: "Forbidden access" });
        }
        req.decoded = decoded;
        next();
    });
}

async function run() {
    try {
        await client.connect();
        const productCollection = client
            .db("samiIndustry")
            .collection("products");
        const reviewCollection = client
            .db("samiIndustry")
            .collection("reviews");
        const userCollection = client.db("samiIndustry").collection("users");
        const orderCollection = client.db("samiIndustry").collection("orders");
        const paymentCollection = client
            .db("samiIndustry")
            .collection("payments");

        // ADD USER FIRST TIME AFTER CREATE ACCOUNT
        app.put("/user/:email", async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const option = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await userCollection.updateOne(
                filter,
                updateDoc,
                option
            );
            const token = jwt.sign({ email: email }, process.env.WEB_TOKEN);
            res.send({ result, token });
        });
        app.post("/create-payment-intent", verifyJWT, async (req, res) => {
            const { paymentPrice } = req.body;
            const amount = paymentPrice * 100;
            console.log(amount);
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",
                payment_method_types: ["card"],
            });
            res.send({ clientSecret: paymentIntent.client_secret });
        });

        // MAKE ADMIN AND SET CONDITION SO THAT WITHOUT ADMIN NO ON MAKE ADMIN TO OTHER
        app.put("/user/admin/:email", verifyJWT, async (req, res) => {
            const email = req.params.email;
            const requester = req.decoded.email;
            const requesterAccount = await userCollection.findOne({
                email: requester,
            });
            if (requesterAccount.role === "admin") {
                const filter = { email: email };
                const updateDoc = {
                    $set: { role: "admin" },
                };
                const result = await userCollection.updateOne(
                    filter,
                    updateDoc
                );
                res.send(result);
            } else {
                res.status(403).send({ message: "Forbidden access" });
            }
        });
        app.get("/admin/:email", async (req, res) => {
            const email = req.params.email;
            const user = await userCollection.findOne({ email: email });
            const isAdmin = user.role === "admin";
            res.send({ admin: isAdmin });
        });

        app.get("/user", verifyJWT, async (req, res) => {
            const user = await userCollection.find().toArray();
            res.send(user);
        });

        app.delete("/user/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });

        // POST ORDER FROM CLIENT SITE
        app.post("/order", async (req, res) => {
            const newOrder = req.body;
            const result = await orderCollection.insertOne(newOrder);
            res.send(result);
        });
        app.get("/orders", async (req, res) => {
            const result = await orderCollection.find().toArray();
            res.send(result);
        });

        app.delete("/orders/:id", verifyJWT, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        });

        app.get("/order", verifyJWT, async (req, res) => {
            const userEmail = req.query.email;
            const query = { userEmail: userEmail };
            const orders = await orderCollection.find(query).toArray();
            res.send(orders);
        });
        app.get("/order/:paymentId", async (req, res) => {
            const paymentId = req.params.paymentId;
            const query = { _id: ObjectId(paymentId) };
            const orders = await orderCollection.findOne(query);
            res.send(orders);
        });
        app.patch("/order/:id", verifyJWT, async (req, res) => {
            const id = req.params.id;
            const payment = req.body;
            const filter = { _id: ObjectId(id) };
            const updatedDoc = {
                $set: {
                    paid: true,
                    transactionId: payment.transactionId,
                },
            };
            const result = await paymentCollection.insertOne(payment);
            const updatedOrder = await orderCollection.updateOne(
                filter,
                updatedDoc
            );
            res.send(updatedOrder);
        });

        app.delete("/order/:id", verifyJWT, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        });

        //TO GET ALL PRODUCT
        app.get("/product", async (req, res) => {
            const query = {};
            const products = await productCollection.find(query).toArray();
            res.send(products);
        });

        // TO ADD NEW PRODUCT
        app.post("/product", async (req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        });

        //GET SINGLE PRODUCT INFO
        app.get("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.send(result);
        });

        // DELETE SINGE PRODUCT
        app.delete("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.send(result);
        });

        //TO GET ALL REVIEW
        app.get("/review", async (req, res) => {
            const query = {};
            const reviews = await reviewCollection.find(query).toArray();
            res.send(reviews);
        });

        //TO POST REVIEW
        app.post("/review", async (req, res) => {
            const newReview = req.body;
            const result = await reviewCollection.insertOne(newReview);
            res.send(result);
        });

        app.delete("/review/:id", verifyJWT, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        });
    } finally {
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Sami Industry's server");
});

app.use(errorHandler);

app.all("*", (req, res) => {
    res.send("No route found");
});

process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
});
