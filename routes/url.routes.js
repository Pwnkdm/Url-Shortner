const express = require('express');
const { handleGenerateshortUrl, handleGetAnlytics, handleGetAllAnlytics, getUrlRedirect } = require('../Controllers/url.controller');


const router = express.Router();

router.post("/",handleGenerateshortUrl);
router.get('/analytics/:shortId',handleGetAnlytics);
router.get('/analytics',handleGetAllAnlytics);
router.get('/:shortId',getUrlRedirect);

module.exports = router;