const express = require("express");
const router = express.Router();

const { getproducts } = require("../controllers/Bot");

router.post("/searchproduct", getproducts);

module.exports = router;
