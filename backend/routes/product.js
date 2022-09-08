import {loadAllTrackedProductsPrices} from "../controllers/ScrapperController";

const express = require("express");

import multer from "multer";
import {fileFilter, storage} from "../Utils/utils";

const {createProduct , deleteProduct ,getRecommandedProductsByUser,getAll, getTrackedProductsByUser,getAllByUser, trackProduct, untrackProduct,getProduct,setUserDesiredPrice,updateUserDesiredPrice,removeUserDesiredPrice} = require("../controllers/ProductController");
const router = express.Router();
const { getPrice } = require("../controllers/ProductController");

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/getPrice", getPrice); //for test
//router.post("/create", upload.single('image'),createProduct); create with save image
router.post("/create",createProduct);
router.get("/get-product", getProduct);
router.delete("/delete/:id",deleteProduct); //tested
router.get("/get-tracked-products",getTrackedProductsByUser);
router.post("/track-product",trackProduct);
router.post("/untrack-product",untrackProduct);
router.get("/get-all",getAll);
router.get("/get-products",getTrackedProductsByUser);
router.get("/get-all-by-user",getAllByUser);
router.post("/set-user-desired-price",setUserDesiredPrice);
router.put("/update-user-desired-price",updateUserDesiredPrice);
router.delete("/delete-user-desired-price",removeUserDesiredPrice);
router.get("/get-product-recommandation",getRecommandedProductsByUser);
module.exports = router;