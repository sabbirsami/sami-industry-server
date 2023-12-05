const Orders = require("../model/orderSchema");

module.exports.getAllOrders = async (req, res) => {
    try {
        const result = await Orders.find({});
        res.send(result);
    } catch (error) {
        console.log("Fail to get all orders", error);
    }
};
module.exports.getUserOrders = async (req, res) => {
    try {
        const email = req.params.email;
        console.log(email);
        const result = await Orders.find({ userEmail: email });
        res.send(result);
    } catch (error) {
        console.log("Fail to user orders", error);
    }
};
module.exports.deleteUserOrder = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const result = await Orders.deleteOne({ _id: id });
        res.send(result);
    } catch (error) {
        console.log("Fail to user orders", error);
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
