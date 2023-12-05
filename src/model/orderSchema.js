const { default: mongoose } = require("mongoose");

const orderSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },

    productName: {
        type: String,
        require: true,
    },

    totalPrice: {
        type: Number,
        require: true,
    },

    userAddress: {
        type: String,
        require: true,
    },

    quantity: {
        type: Number,
        require: true,
    },

    singlePrice: {
        type: Number,
        require: true,
    },

    userEmail: {
        type: String,
        require: true,
    },
});

const Orders = new mongoose.model("orders", orderSchema);
module.exports = Orders;
