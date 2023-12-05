const User = require("../model/userSchema");

module.exports.getAllUsers = async (req, res) => {
    try {
        const email = req.params.email;
        const result = await User.find({ email });
        res.send(result);
    } catch (error) {
        console.log("Fail to get a user", error);
    }
};
