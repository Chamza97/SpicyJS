import Site from "../models/Site";

module.exports = {
    getAll,
    getSiteByProductUrl,
    create
};
async function getAll() {
    return  Site.find();
}

async function getSiteByProductUrl(url){
    return await Site.find().then(sites => {
        return sites.find(site => url.includes(site.baseURL))
    })
}
async function create(siteParam) {
    const site = new Site(siteParam);
    await site.save();
}