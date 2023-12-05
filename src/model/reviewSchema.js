const { default: mongoose } = require("mongoose");

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },

    ratingValue: {
        type: Number,
        require: true,
    },
    dic: {
        type: String,
        require: true,
    },
});
const Reviews = new mongoose.model("reviews", reviewSchema);
module.exports = Reviews;
