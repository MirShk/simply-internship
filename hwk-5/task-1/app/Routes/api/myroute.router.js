const express = require('express');
const router = express.Router();
const indexController = require('../../Http/controllers/myroute.controller');

module.exports = (app_v) => {
    const baseUrl = `/api/${app_v}/myroute`;
    router.get(`${baseUrl}/:param`, indexController.collectData);

    return router;
};



