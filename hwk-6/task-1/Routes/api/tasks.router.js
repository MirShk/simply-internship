const express = require('express');
const router = express.Router();
const tasksController = require('../../Http/controllers/tasks.controller');

module.exports = (app_v = 'v1') => {
    const baseUrl = `/api/${app_v}/tasks`;

    router.get(`${baseUrl}/`, tasksController.getTasks); //query params filter

    router.post(`${baseUrl}/`, tasksController.createTask);

    router.put(`${baseUrl}/:taskId`, tasksController.updateTask);

    return router;
};