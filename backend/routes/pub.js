const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

//import controller
const { insertpub, getpub, getpubbyid, updatepub, deletepub } = require("../controllers/pub");

const storage = multer.diskStorage({
    destination: "../frontend/public/uploads",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  
  const upload = multer({
    storage: storage,
  });

router.post("/insert",upload.single("pubImage"), insertpub);
router.get("/getpub", getpub);
router.get("/getonepub/:id", getpubbyid);
router.put("/update/:id",upload.single("pubImage"), updatepub);
router.delete("/delete/:id", deletepub);

module.exports = router;
