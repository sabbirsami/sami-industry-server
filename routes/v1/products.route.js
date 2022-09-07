const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("products found");
});
router.post("/", (req, res) => {
    res.send("products added");
});

module.exports = router;
