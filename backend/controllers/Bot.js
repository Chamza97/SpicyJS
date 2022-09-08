import Product from "../models/Product";

exports.getproducts = async (req, res, next) => {
  /*let name = "";
  req.body.forEach(({ from, msag }, index) => {
   if(from === "cb" && msag === "what you want to buy"){
     
   }
  });
  console.log(name);*/
  console.log(req.body.name);
  let name = req.body.name;
  let brand = req.body.brand;
  let fullname = `${name} ${brand}`;
  let price = req.body.price;
  const userId = req.body.userId;
  console.log(name,brand,price);
  await Product.aggregate([
          {$match: {$and: [{name: new RegExp(fullname, "i")}, {price: {$lte: parseInt(price)}}]}},
          {
              $addFields: {
                  'trackedByThisUser': {
                      '$setIsSubset': [
                          [{'$toObjectId': userId}],
                          '$trackedBy'
                      ]
                  }
              }

          },
          //{ $unset: "trackedBy" }
      ],

      (err, result) => {
          if (err) {
              res.send(err);
          }
          res.send(result);

          console.log(result);
      }
  );
};
