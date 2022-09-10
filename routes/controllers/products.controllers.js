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
            message: `Tool added with id: ${result.insertedId}`,
        });
    } catch (error) {
        next(error);
    }
};
