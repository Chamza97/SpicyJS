const express = require("express");

const {createSite ,getSiteByProductUrl} = require("../controllers/SitesController");
const router = express.Router();

router.post("/create", createSite );
router.post("/getSiteByProductURL", getSiteByProductUrl);
module.exports = router;