const express = require('express');
const urlRoute = require('./routes/url.routes');
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
require('dotenv').config()
const cors = require('cors');

const app = express();

app.use(cors());

connectToMongoDB(`mongodb+srv://${process.env.USERNAME}:${process.env.PASS}@cluster0.inutweg.mongodb.net/url-shortner?retryWrites=true&w=majority`).then(()=>{
console.log("MogoDb Connected!");
})

app.use(express.json());

app.use('/url',urlRoute);

app.listen(process.env.PORT||8080,()=>{
    console.log(`Server listening on ${process.env.PORT || 8080}`);
});