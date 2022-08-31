module.exports.getAllProducts = (req, res, next) => {
    const { ip, query, params, body, headers } = req;
    res.send("got it");
};
