const express = require('express');
const router = express.Router();
const resultsController = require('../../Http/controllers/time.controller');

module.exports = (app_v) => {
    const baseUrl = `/api/${app_v}/time`;

    router.get(baseUrl, resultsController.getTime);

    return router;
};