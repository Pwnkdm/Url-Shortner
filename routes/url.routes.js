const express = require('express');
const { handleGenerateshortUrl, handleGetAnlytics } = require('../Controllers/url.controller');


const router = express.Router();

router.post("/",handleGenerateshortUrl);

router.get('/analytics/:shortId',handleGetAnlytics)

module.exports = router;