const Products = require("../model/productSchema");

const getAllProduct = async (req, res) => {
    try {
        const result = await Products.find({});
        res.send(result);
    } catch (error) {
        console.log("Fail to get all product", error);
    }
};
module.exports = { getAllProduct };
