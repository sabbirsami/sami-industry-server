const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    price: {
        type: Number,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    about: {
        type: String,
        require: true,
    },
    minimumOrderQuantity: {
        type: String,
        require: true,
    },
    supplier: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true,
    },
});

const Products = new mongoose.model("products", productSchema);
module.exports = Products;
