const express = require('express');
const router = express.Router();
const editController = require('../../Http/controllers/edit.controller');

module.exports = (app_v) => {
    const baseUrl = `/api/${app_v}/edit`;

    router.get(`${baseUrl}/:itemId`, editController.renderEdit);

    router.get(`${baseUrl}/update`, editController.editTodoItem);

    return router;
};