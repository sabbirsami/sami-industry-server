const { getDb } = require("../../utils/dbConnect");

module.exports.getAllProduct = async (req, res, next) => {
    try {
        const db = getDb();
        const product = await db.collection("products").find().toArray();
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

module.exports.saveAProduct = async (req, res, next) => {
    try {
        const db = getDb();
        const product = req.body;
        const result = await db.collection("products").insertOne(product);
        console.log(result);
        if (!result.insertedId) {
            return res
                .status(400)
                .send({ status: false, error: "Something went wrong!" });
        }
        res.send({
            success: true,
            message: `Product added with id: ${result.insertedId}`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports.getProductDetail = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ success: false, error: "Not a valid Product id." });
        }
        const product = await db
            .collection("products")
            .findOne({ _id: ObjectId(id) });
        if (!product) {
            return res.status(400).json({
                success: false,
                error: "Couldn't find a Product with this id",
            });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

module.exports.updateProduct = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ success: false, error: "Not a valid product id." });
        }
        const product = await db
            .collection("products")
            .updateOne({ _id: ObjectId(id) }, { $set: req.body });
        if (!product.modifiedCount) {
            return res
                .status(400)
                .json({ success: false, error: "Couldn't update the product" });
        }
        res.status(200).json({
            success: true,
            message: "Successfully updated the product",
        });
    } catch (error) {
        next(error);
    }
};

module.exports.deleteProduct = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ success: false, error: "Not a valid product id." });
        }
        const product = await db
            .collection("products")
            .deleteOne({ _id: ObjectId(id) });
        if (!product.deletedCount) {
            return res
                .status(400)
                .json({ success: false, error: "Couldn't delete the product" });
        }
        res.status(200).json({
            success: true,
            message: "Successfully deleted the product",
        });
    } catch (error) {
        next(error);
    }
};

module.exports.test = async (req, res, next) => {
    for (let i = 0; i < 100000; i++) {
        const db = getDb();
        db.collection("test").insertOne({ name: `test ${i}`, age: i });
    }
};
module.exports.testGet = async (req, res, next) => {
    const db = getDb();

    const result = await db
        .collection("test")
        .find({ name: "test 99999" })
        .toArray();
    res.json(result);
};
