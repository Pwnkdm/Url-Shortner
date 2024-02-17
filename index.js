const express = require('express');
const urlRoute = require('./routes/url.routes');
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
require('dotenv').config()

const app = express();

connectToMongoDB(`mongodb+srv://${process.env.USERNAME}:${process.env.PASS}@cluster0.inutweg.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
console.log("MogoDb Connected!");
})

app.use(express.json());

app.use('/url',urlRoute);

app.get('/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory:{timeStamp:Date.now()},
        }
    });
    res.redirect(entry.redirectUrl);
});

app.listen(process.env.PORT||8080,()=>{
    console.log(`Server listening on ${process.env.PORT || 8080}`);
});