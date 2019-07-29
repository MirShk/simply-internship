const express = require('express');
const router = express.Router();
const indexController = require('../../Http/controllers/index.controller');

module.exports = (app_v = 'v1') => {
    console.log(app_v);

    const baseUrl = `/api/${app_v}`;

    router.get(`${baseUrl}/get-todo-list`, indexController.getTodoList);

    router.post(`${baseUrl}/add`, indexController.addTodo);

    router.delete(`${baseUrl}/delete/:itemKey`, indexController.deleteTodo);

    router.get(`${baseUrl}`, indexController.renderIndex);

    return router;
};