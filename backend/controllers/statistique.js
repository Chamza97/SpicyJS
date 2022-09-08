const path = require("path");
const User = require("../models/user");
const servicestatistique =require ("../Service/statistique");

exports.getuser = (req, res,next) => {
  servicestatistique.getAll().then(users => res.json(users))
  .catch(err => next(err));
}

exports.getuserpremieum = (req, res,next) => {
  servicestatistique.getAllpremieum().then(users => res.json(users))
  .catch(err => next(err));
}

exports.getusersubscriber = (req, res,next) => {
  servicestatistique.getAllSubscriber().then(users => res.json(users))
  .catch(err => next(err));
}