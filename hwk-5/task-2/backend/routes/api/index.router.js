const express = require('express');
const router = express.Router();
const indexController = require('../../http/controllers/index.controller');

module.exports = (app_v = 'v1') => {
    const baseUrl = `/api/${app_v}`;

    router.get(`${baseUrl}/fetch`, indexController.getTodoList);

    router.post(`${baseUrl}/create`, indexController.addTodo);

    router.delete(`${baseUrl}/delete/:itemKey`, indexController.deleteTodo);

    router.get(`${baseUrl}`, indexController.renderIndex);

    return router;
};