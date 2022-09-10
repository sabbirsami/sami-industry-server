module.exports.saveATool = async (req, res, next) => {
    try {
        const db = getDb();
        const tool = req.body;

        const result = await db.collection("tools").insertOne(tool);
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
