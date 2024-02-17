const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 8 });
const URL = require("../models/url");

async function handleGenerateshortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({ error:"url is required"})
    const shortId = uid.rnd();
    await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[],        
    });

    return res.json({id:shortId});
}

async function handleGetAnlytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    });

}

module.exports = {
    handleGenerateshortUrl,
    handleGetAnlytics,
}