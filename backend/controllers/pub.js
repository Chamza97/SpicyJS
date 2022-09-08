const PubModel = require("../models/pub");

const { callbackify } = require("util");

/**
 * Add Function
 */
exports.insertpub =
  (
  (req, res) => {
    const pub = new PubModel({
      name: req.body.name,
      description: req.body.desc,
      date_debut: req.body.dated,
      date_fin: req.body.datef,
      PubImage: req.file.filename,
    });
    try {
      pub.save((err, pub) => {
        if (err) {
          console.log("Publicité add ERROR", err);
          return res.status(401).json({
            error: "Error saving publicité in database. Try again!!!",
          });
        }
      });
      console.log("the save is Done");
    } catch (error) {
      console.log(error);
    }
  });

/**
 * Read Function
 */
exports.getpub = async (req, res) => {
  PubModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};
exports.getpubbyid = async (req, res) => {
  const id = req.params.id;
  PubModel.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};
/**
 * Update Function
 */
exports.updatepub =
  (
  async (req, res) => {
    const id = req.params.id;

    try {
      PubModel.findById(id).then((PubModel) => {
        PubModel.name = req.body.name;
        PubModel.description = req.body.desc;
        PubModel.date_debut = req.body.dated;
        PubModel.date_fin = req.body.datef;
        PubModel.PubImage = req.file.filename;

        PubModel.save().then(() => res.json("the pub updated"));
      });
    } catch (error) {
      console.log(error);
    }
       });
/**
 * Delete Function
 */
exports.deletepub = async (req, res) => {
  const id = req.params.id;

  PubModel.findByIdAndRemove(id).exec();
  res.send("deleted");
};
