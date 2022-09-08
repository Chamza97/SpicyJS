const express = require("express");
const router = express.Router();

const {create ,
      deleteNotification ,
      getNotificationUser,
      getNotificationByID,
      DeleteNotificationByUser,
      sendNotification
    }
       = require("../controllers/NotificationController");

//Works :)
router.get("/:id",getNotificationByID );
router.post("/create", create);
router.delete("/delete/:id",deleteNotification);
router.get("/user/:id",getNotificationUser );
router.delete("/deleteUser/:id",DeleteNotificationByUser);

router.post("/send",sendNotification );


module.exports = router;
