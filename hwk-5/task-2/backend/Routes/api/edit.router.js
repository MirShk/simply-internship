const express = require('express');
const router = express.Router();
const editController = require('../../Http/controllers/edit.controller');
const appConfig = require('../../../config/app.env.config');

module.exports = (app_v = 'v1') => {
    const baseUrl = `/api/${app_v}/edit`;

    router.get(`${baseUrl}/:itemId`, editController.renderEdit);

    router.put(`${baseUrl}/:itemId`, editController.editTodoItem);

    return router;
};