const express = require("express");

const router = express.Router();

const {create,getAll, getLastTwo} = require("../controllers/UserHistory");
router.post("/create", create);
router.get("/get-all", getAll);
router.get("/get-last-two", getLastTwo);
module.exports = router;