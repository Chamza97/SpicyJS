const PubModel = require("../models/pub");
exports.getpublicity = async (req, res) => {
  if (Date.now()>=PubModel.date_fin){
    PubModel.find({}, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  }
  };