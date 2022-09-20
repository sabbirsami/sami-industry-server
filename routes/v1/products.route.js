const express = require("express");
const {
    updateAProduct,
    bulkUpdateProduct,
    saveAProduct,
    deleteProductById,
} = require("../../controllers/products.controllers");
const router = express.Router();

router.route("/bulk-update").patch(bulkUpdateProduct);
router
    .route("/")
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
    .get((req, res) => {
        console.log(res);
        res.send("products found");
    })
    /**
     * @api {post} / Save a tool
     * @apiDescription Save a the tool
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
    .post(saveAProduct);

router.route("/:id").patch(updateAProduct).delete(deleteProductById);
module.exports = router;
