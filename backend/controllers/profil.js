const multer = require("multer");
const path = require("path");
const User = require("../models/user");


exports.getuser = async (req, res) => {
  User.find({role : {$ne :"admin"}}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};



exports.updateUsercompleterprofil = (req, res, next) => {
  try {
    User.findById(req.params.id).then((PubModel) => {
    PubModel.description = req.body.description;
    PubModel.photo = req.file.filename;
    PubModel.save().then(() => res.json("the user updated"));
    });
  } catch (error) {
    console.log(error);
  }
     }



exports.updateUser = (req, res, next) => {
  try {
    User.findById(req.params.id).then((PubModel) => {
   
      PubModel.description = req.body.description;
      PubModel.name = req.body.name;
      PubModel.photo = req.file.filename;
      PubModel.save().then(() => res.json("the user updated"));
    });
  } catch (error) {
    console.log(error);
  }
     }
  // get user by id 
  exports.getUserbyid = async (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  };

// hadia update t3 user

  exports.updateUserrole = (req, res, next) => {
    try {
      User.findById(req.params.id).then((PubModel) => {
     
        PubModel.role = "premuiem";
        PubModel.save().then(() => res.json("the user updated"));
      });
    } catch (error) {
      res.json(error);
    }
       }
      exports.updateUserRole = async (idUser,role) =>{

          return User.findByIdAndUpdate(
              idUser,
              { $set: { role: role }},
              { new: true, useFindAndModify: false }
          );
    
      }