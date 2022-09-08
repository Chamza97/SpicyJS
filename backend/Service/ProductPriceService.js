import Site from "../models/Site";
import ProductPrice from "../models/ProductPrice";
import Product from "../models/Product";
const scrapeIt = require("scrape-it");
module.exports = {
    isvalidProductURL,
    getProductPriceFromWebSitePage,
    create,
    deleteByIDProduct,
    getAllByProduct,
    getProductBestPrice,
    getProductlastestPrice
};
async function isvalidProductURL(url) {
    const sites =  Site.find() ;
    await sites.forEach(site => {
        if(url.contains(site.baseUrl)) {
            return true
        }
    })
    return false;
}
  function getProductPriceFromWebSitePage( productURL , siteTags , disponibiliteTags  , _callback) {

      delay(function(){
      }, 5000 );
      console.log(siteTags , disponibiliteTags,productURL)
    scrapeIt(productURL , {
        price: {
            selector: siteTags.join(', '),
            convert : price => handlePriceString(price)
        },
        onStock : {
            selector : disponibiliteTags.join(', ') ,
            convert : disponibilite => convertOnStockToBoolean(disponibilite)
        }
    }).then(({data, response }) => {

        _callback(data)
    }).catch(function (err) {
        console.log(err)
        _callback(err)
    });
}

function convertOnStockToBoolean(onStockString){
    var str = onStockString.replace( /[^a-zA-Z0-9]/ , "")
    console.log(str)

    switch (str.trim()) {
        case 'Sur commande' : return false;
        case 'En stock' : return true;
        case 'Disponible' : return true;
        default : return false;
    }
}
function handlePriceString(priceString){
    console.log(priceString)
    var res = priceString.replace(/0,000 TND|^0,000|TND/gi, function (x) {
        return "";
    });

    const priceArray = res.split(' ');
    return priceArray[0];
}

async function getAllByProduct(id) {
    return  ProductPrice.find({idProduct: id}).sort({ createdAt: 'ASC'}).exec();
}
async function deleteByIDProduct(idProduct) {
    await ProductPrice.deleteMany({idProduct : idProduct});
}
async function create(productPriceParam) {
    const productPrice = new ProductPrice(productPriceParam);
    await productPrice.save();
}
async function getProductBestPrice(productId) {
    return Product.findOne( { idProduct : productId}).sort({price:-1});
}
async function getProductlastestPrice(productId) {
    return Product.findOne( { idProduct : productId}).sort({createdAt:1});
}



var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();