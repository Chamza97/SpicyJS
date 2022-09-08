import ProductPrice from "../models/ProductPrice";
const productService = require('../Service/ProductService');
const productPriceService = require('../Service/ProductPriceService');
const {getProductPriceFromWebSitePage} = require("../Service/ProductPriceService");
const historyService = require('../Service/UserHistory');
exports.getPrice =  (req, res) => {
    const url = "https://www.tunisianet.com.tn/tissot/44678-montre-pour-homme-tissot-pr-100-chronograph-t1014171104100.html"
    getProductPriceFromWebSitePage(url, ["dsnnnnnn" , ".current-price","trd"] ,[".in-stock" , ".later-stock"] ,function(data) {
        return res.json(data)
    })
}

exports.createProduct = (req, res, next) => {
   // req.body.image = req.file.filename;
    productService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
exports.deleteProduct = (req, res, next) => {
    productPriceService.deleteByIDProduct(req.params.id);
    productService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
// to verify
exports.updateProduct = (req, res, next) => {
    productService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
exports.getAll  = (req, res, next) => {
    productService.getAll()
        .then(products => res.json(products))
        .catch(err => next(err));
}

exports.trackProduct  = (req, res, next) => {
    productService.trackProduct(req.body.userId,req.body.productId)
        .then(products => res.json(products))
        .catch(err => next(err));
}

exports.untrackProduct  = (req, res, next) => {
    productService.untrackProduct(req.body.userId,req.body.productId)
        .then(products => res.json(products))
        .catch(err => next(err));
}

exports.setUserDesiredPrice  = (req, res, next) => {
    productService.setUserDesiredPrice(req.body.userId,req.body.productId,req.body.price)
        .then(data => res.json(data))
        .catch(err => next(err));
}

exports.updateUserDesiredPrice  = (req, res, next) => {
    productService.updateUserDesiredPrice(req.body.userId,req.body.productId,req.body.price)
        .then(data => res.json(data))
        .catch(err => next(err));
}

exports.removeUserDesiredPrice  = (req, res, next) => {
    productService.removeUserDesiredPrice(req.body.userId,req.body.productId)
        .then(data => res.json(data))
        .catch(err => next(err));
}

exports.getTrackedProductsByUser  = (req, res, next) => {
    var offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
    productService.getTrackedProductsByUser(req.query.userId,offset)
        .then(resp => res.json(resp))
        .catch(err => next(err));
}

exports.getProduct = (req, res, next) => {
    productService.getById(req.query.productId)
        .then(product => res.json(product))
        .catch(err => next(err));
}
exports.getAll  = (req, res, next) => {
    productService.getAll()
        .then(products => res.json(products))
        .catch(err => next(err));
}
exports.getAllByUser = (req, res, next) => {
    productService.getAllByUser(req.query.userId)
        .then(resp => res.json(resp))
        .catch(err => next(err));
}

exports.getAllByUser = (req, res, next) => {
    productService.getAllByUser(req.query.userId)
        .then(resp => res.json(resp))
        .catch(err => next(err));
}

exports.getRecommandedProductsByUser = (req, res, next) => {

    historyService.getLastTwoByUser(req.query.userId)
        .then(resp =>{
             Promise.all(resp.map((history) =>{
                return productService.getRecommandedProducts(history.name, history.brand, history.price,req.query.userId).then( r =>{
                    return r.length < 1 || r === undefined ?  null : r
                    }
                ) }
            )).then(resp => resp.filter(item => item != null)).then(resp => res.json(resp))

            })
        .catch(err => next(err));
}


