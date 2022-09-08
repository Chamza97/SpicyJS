
const express = require("express");
const productPriceService = require("../Service/ProductPriceService");
const {getProductsPricesByIdProduct} = require("../controllers/productPriceConstroller");
const router = express.Router();

router.get("/get-product-prices", getProductsPricesByIdProduct );

exports.createProductPrice = (req, res, next) => {
    productPriceService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
exports.createProductPrice = (req, res, next) => {
    productPriceService.isvalidProductURL(req.params.url)
        .then(() => res.json({}))
        .catch(err => next(err));
}
module.exports = router;