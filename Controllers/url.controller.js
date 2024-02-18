const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 8 });
const URL = require("../models/url");

async function handleGenerateshortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({ error:"url is required"})
    const shortId = uid.rnd();
    const IdExists = await URL.findOne({ redirectUrl:body.url });
    if(IdExists){
        return res.status(200).json({message:"id already craeted!",id:IdExists.shortId});
    }
    await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[],        
    });

    return res.json({id:shortId,message:"ShortId created successfully"});
}

async function handleGetAnlytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    });

}

async function handleGetAllAnlytics(req, res){
    try{
        console.log('helloo')
        const allDocuments = await URL.find({}, { visitHistory: 1,createdAt:1,shortId:1,redirectUrl:1 });
        
    return res.json({
        totalClicks:allDocuments.length,
        analytics:allDocuments
    });
    }catch(error){
    return res.json({errors: error});
    }
}

async function getUrlRedirect(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory:{timeStamp:Date.now()},
        }
    });
    res.redirect(entry.redirectUrl);
}

module.exports = {
    handleGenerateshortUrl,
    handleGetAnlytics,
    handleGetAllAnlytics,
    getUrlRedirect
}