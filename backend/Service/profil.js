const User = require("../models/user");
const multer = require('multer');
module.exports = {
    update,
};

async function update(id, UserParam) {
    const myUser =  User.findById(id);
    Object.assign(myUser, UserParam);
    await myUser.save();
}