const express = require('express');
const router = express.Router();
const tasksController = require('../../Http/controllers/tasks.controller');

module.exports = (app_v = 'v1') => {
    const baseUrl = `/api/${app_v}/tasks`;

    router.post(`${baseUrl}/`, tasksController.createTask);

    router.delete(`${baseUrl}/delete-completed`, tasksController.deleteCompletedTasks);

    router.put(`${baseUrl}/update`, tasksController.updateTask);

    router.get(`${baseUrl}/sorted-uncompleted-tasks`, tasksController.getSortedUncompletedTasks);

    return router;
};