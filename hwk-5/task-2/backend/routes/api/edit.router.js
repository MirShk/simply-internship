const express = require('express');
const router = express.Router();
const editController = require('../../http/controllers/edit.controller');

module.exports = (app_v = 'v1') => {
    const baseUrl = `/api/${app_v}/edit`;

    router.put(`${baseUrl}/:itemId`, editController.editTodoItem);

    return router;
};