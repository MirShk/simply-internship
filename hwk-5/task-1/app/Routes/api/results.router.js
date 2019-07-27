const express = require('express');
const router = express.Router();
const resultsController = require('../../Http/controllers/results.controller');

module.exports = (app_v) => {
    const baseUrl = `/api/${app_v}/result`;

    router.get(baseUrl, resultsController.renderResults);

    return router;
};