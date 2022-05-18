const express = require('express');
const route = express.Router();

const siteController = require('../app/controllers/SiteController');

// newsController.index
route.get('/', siteController.index);

module.exports = route;
