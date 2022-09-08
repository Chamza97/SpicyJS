const express = require("express");
const {getuser,getuserpremieum,getusersubscriber} = require("../controllers/statistique");
const router = express.Router();
router.get("/statistique",getuser);
router.get("/statistiquepre",getuserpremieum);
router.get("/statistiquesubscri",getusersubscriber);
module.exports = router;