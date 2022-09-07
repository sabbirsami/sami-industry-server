const express = require("express");
const router = express.Router();

/**
 * @api {get} /tools All tools
 * @apiDescription Get all the tools
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
 *
 * @apiSuccess {Object[]} all the tools.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 **/

router
    .route("/")
    .get((req, res) => {
        res.send("products found");
    })
    .post((req, res) => {
        res.send("products added");
    });

module.exports = router;
