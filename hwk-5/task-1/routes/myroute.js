const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');

module.exports = (app_v) => {
    const baseUrl = `/api/${app_v}/myroute`;

    router.get(`${baseUrl}/:param`, (req, res) => {
        const collectedData = indexController.collectData(req);
        res.render('myroute', { collectedData });
        //todo :: error handling
    });

    return router;
};



