const siteService = require('../Service/SiteService');

exports.createSite = (req, res, next) => {

    siteService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
exports.getSiteByProductUrl = (req, res, next) => {
    siteService.getSiteByProductUrl(req.body.url)
        .then(site => site ?  res.json(site) : res.json({}))
        .catch(err => next(err));
}