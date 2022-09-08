const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { updateUser ,getuser,getUserbyid,updateUserrole ,updateUsercompleterprofil } = require("../controllers/profil");
const storage = multer.diskStorage({
    destination: "../frontend/public/uploadsuser",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });


const upload = multer({ storage: storage });
router.get("/getUserbyid/:id", getUserbyid);
router.get("/getuser", getuser);
router.put("/updateuser/:id",upload.single("photo"), updateUser);
router.put("/updateuserp/:id",upload.single("photo"), updateUsercompleterprofil);
router.put("/updateUserrole/:id",updateUserrole);

module.exports = router;
