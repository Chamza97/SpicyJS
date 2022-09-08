const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

//import controller
const { getpublicity } = require("../controllers/publicity");
router.get("/getpublicity", getpublicity);
module.exports = router;