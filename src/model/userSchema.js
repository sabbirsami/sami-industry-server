const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
    },

    role: {
        type: String,
    },
});
const User = new mongoose.model("users", userSchema);
module.exports = User;
