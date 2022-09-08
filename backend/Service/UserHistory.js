import User from "../models/user";
import UserHistory from "../models/UserHistory";
import Site from "../models/Site";
import Product from "../models/Product";

module.exports = {
    getAllByUser,
    create,
    getLastTwoByUser
};
async function getAllByUser(userId) {
    return  UserHistory.find({userId : userId});
}

async function create(params) {
    return UserHistory.findOneAndUpdate(
        { $and : [{ userId: params.userId},{name : params.name} , {brand : params.brand} , {price : params.price  }]},
        {
            $setOnInsert: {
                        userId: params.userId,
                        name : params.name ,
                        brand : params.brand ,
                        price : params.price
            }
        },
        { new: true, useFindAndModify: false ,upsert :true }
    );
}
async function getLastTwoByUser(userId) {
   return UserHistory.find({userId : userId}).sort({ updatedAt: -1 }).limit(2);
}