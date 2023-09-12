const express = require('express');
const router = express.Router();
const {getCountryImageUrls, getCityImageUrls} = require('../controllers/imageControllers.js');

router.get('/all-country-images', getCountryImageUrls);

router.get('/all-city-images', getCityImageUrls);

module.exports = router;




