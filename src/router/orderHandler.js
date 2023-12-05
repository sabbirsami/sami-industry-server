const Orders = require("../model/orderSchema");

module.exports.getAllOrders = async (req, res) => {
    try {
        const result = await Orders.find({});
        res.send(result);
    } catch (error) {
        console.log("Fail to get all orders", error);
    }
};
module.exports.postAOrder = async (req, res) => {
    try {
        const newOrder = new Orders(req.body);
        const result = await newOrder.save();
        res.send(result);
    } catch (error) {
        console.log("Fail to save a order", error);
    }
};
