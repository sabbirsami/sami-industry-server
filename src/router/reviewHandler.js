const Reviews = require("../model/reviewSchema");

module.exports.getAllReviews = async (req, res) => {
    try {
        const result = await Reviews.find({});
        res.send(result);
    } catch (error) {
        console.log("Fail to get all review", error);
    }
};
