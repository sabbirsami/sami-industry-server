const express = require("express");
const cors = require("cors");

const applyMiddleware = (app) => {
    app.use(
        cors({
            origin: [
                "http://localhost:5173",
                "https://sami-industry.web.app/",
                "https://sami-industry.firebaseapp.com",
            ],
        })
    );
    app.use(express.json());
};

module.exports = applyMiddleware;
