const NotificationService = require('../Service/NotificationService')


//Create
exports.create = (req, res, next) => {
    
    NotificationService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

//Delete
exports.deleteNotification = (req, res, next) => {
    NotificationService._delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

//GetNotifByUserId
exports.getNotificationUser  = (req, res, next) => {
    NotificationService.getNotificationByUser(req.params.id)
        .then(notif => notif ? res.json(notif):res.sendStatus(404))
        .catch(err => next(err));
        console.log("ddddddddd"+req.params.id)
}


//GetNotifById
exports.getNotificationByID  = (req, res, next) => {
    NotificationService.getById(req.params.id)
        .then(notification => notification ?  res.json(notification):res.sendStatus(404)) 
        .catch(err => next(err));
}

//DeleteByIdUser
exports.DeleteNotificationByUser  = (req, res, next) => {
    NotificationService._delete(req.params.id)
        .then(() => res.json())
        .catch(err => next(err));
}

exports.sendNotification  = (req, res, next) => {
    NotificationService.sendNotif()
    .then(() => res.json({}))
    .catch(err => next(err));

}