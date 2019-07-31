const express = require('express');
const router = express.Router();
const todosController = require('../../http/controllers/todos.controller');

module.exports = (app_v = 'v1') => {
    const baseUrl = `/api/${app_v}/todos`;

    router.get(`${baseUrl}/fetch`, todosController.getTodoList);

    router.post(`${baseUrl}/create`, todosController.addTodo);

    router.delete(`${baseUrl}/delete/:itemKey`, todosController.deleteTodo);

    router.put(`${baseUrl}/update/:itemKey`, todosController.editTodoItem);

    return router;
};