import Product from "../models/Product";
const multer = require('multer');
import User from "../models/user";
const { create  : createPrice ,getAllByProduct } = require('./ProductPriceService');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getTrackedProductsByUser,
    getTrackedProducts,
    trackProduct,
    untrackProduct,
    setUserDesiredPrice,
    updateUserDesiredPrice,
    removeUserDesiredPrice,
    updatePrice,
    getAllByUser,
    getRecommandedProducts
};

async function getAll() {
    return  Product.find();
}
async function getAllByUser(userId ) {
    const user = await User.findById(userId).exec();
    if(user.role == "admin") {
        return Product.find({});
    } else  {
        return  Product.aggregate([
            { '$addFields': {
                    'trackedByThisUser': {
                        '$setIsSubset': [
                            [{ '$toObjectId': userId }],
                            '$trackedBy'
                        ]
                    }
                }},
            //{ $unset: "trackedBy" }
        ]);
    }
}

async function getById(id) {
    return Product.findById(id);
}

async function create(productParam) {
    const product = new Product(productParam);
    await product.save();
}
//to verify
async function update(id, productParam) {
    const product = new Product.findById(id);
    Object.assign(product, productParam);
    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}

async function getTrackedProducts() {
    return Product.find( { trackedBy : { $ne: null }});
}

async function trackProduct( userId , productId) {
    await Product.findByIdAndUpdate(
        productId,
        { $addToSet: { trackedBy: userId } },
        { new: true, useFindAndModify: false });
     await  Product.findById(productId).exec(function(err, product) {
            getAllByProduct(productId).then(prices => {
                if(prices.length == 0){
                    createPrice({price : product.price,onStock: product.onStock,idProduct :productId})
                }
            })
        });
        return Product.aggregate([
            {$match: {_id : ObjectId(productId)}},
            {
                $addFields: {
                    'trackedByThisUser': {
                        '$setIsSubset': [
                            [{'$toObjectId': userId}],
                            '$trackedBy'
                        ]
                    }
                }

            }
            //{ $unset: "trackedBy" }
        ]);
}

async function untrackProduct( userId , productId) {
    await Product.findByIdAndUpdate(
       productId,
       {$pull: {trackedBy: userId}},
       {new: true, useFindAndModify: false}
   );
    return Product.aggregate([
        {$match: {_id : ObjectId(productId)}},
        {
            $addFields: {
                'trackedByThisUser': {
                    '$setIsSubset': [
                        [{'$toObjectId': userId}],
                        '$trackedBy'
                    ]
                }
            }

        }
        //{ $unset: "trackedBy" }
    ]);

}
async function setUserDesiredPrice( userId , productId , price) {

    return Product.findByIdAndUpdate(
        productId,
        { $addToSet: { usersTargetPrices: { user : userId ,targetPrice :price} }},
        { new: true, useFindAndModify: false }
    );
}

async function updateUserDesiredPrice( userId , productId , price) {
    return Product.findOneAndUpdate(
        { "_id": productId, "usersTargetPrices.user": userId },
        {
            "$set": {
                "usersTargetPrices.$": {user: userId, targetPrice :price}
            }
        },
        { new: true, useFindAndModify: false }
    );
}

async function removeUserDesiredPrice( userId , productId) {

    return Product.findOneAndUpdate(
        { "_id": productId, "usersTargetPrices.user": userId },
        {
            "$set": {
                "usersTargetPrices.$": {}
            }
        },
        { new: true, useFindAndModify: false }
    );
}


async function getTrackedProductsByUser(userId,offset) {

    return  Product.paginate({trackedBy : userId }, { offset: offset, limit: 6 } );

}
async function updatePrice( productId , price,onStock) {

    return Product.findByIdAndUpdate(
        productId,
        { $set: { price: price  , onStock : onStock}},
        { new: true, useFindAndModify: false }
    );
}
async function getRecommandedProducts( name ,brand , price,userId) {
    const minPrice  = (price - 200) < 0 ? 0 : price-200;

        return Product.aggregate([
            {$match: {$text: { $search: `${name} ${brand}`} , price : { $gte: minPrice, $lte: price +200 }  }},
            { $limit : 10 },
            {
                $addFields: {
                    'trackedByThisUser': {
                        '$setIsSubset': [
                            [{'$toObjectId': userId}],
                            '$trackedBy'
                        ]
                    }
                }

            }
            //{ $unset: "trackedBy" }
        ]);
}
