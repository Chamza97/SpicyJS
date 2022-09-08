const historyService = require('../Service/UserHistory');

exports.create = (req, res, next) => {

    historyService.create(req.body)
        .then((resp) => res.json({resp}))
        .catch(err => next(err));
}
exports.getAll = (req, res, next) => {

    historyService.getAllByUser(req.query.userId)
        .then((resp) => res.json({resp}))
        .catch(err => next(err));
}
exports.getLastTwo = (req, res, next) => {

    historyService.getLastTwoByUser(req.query.userId)
        .then((resp) => res.json({resp}))
        .catch(err => next(err));
}
