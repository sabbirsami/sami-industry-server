const { default: mongoose } = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4vlxs.mongodb.net/?retryWrites=true&w=majority`;
        await mongoose.connect(uri);
        console.log("Database connect successfully");
    } catch (error) {
        console.log("connection fail", error);
    }
};

module.exports = connectDB;
