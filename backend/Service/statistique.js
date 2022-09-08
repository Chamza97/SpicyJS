
const User = require("../models/user");
module.exports = {
    getAll,
    getAllpremieum,
    getAllSubscriber,
};
async function getAll() {
    return  User.find().count();
}

async function getAllpremieum() {
  
    return  User.find({role : "premium"}).count();
}

async function getAllSubscriber() {
return  User.find({role : "subscriber"}).count();}

