const express = require('express');
const router = express.Router();
const usersController = require('../../Http/controllers/users.controller');

module.exports = (app_v = 'v1') => {
    const baseUrl = `/api/${app_v}/users`;

    router.get(`${baseUrl}/`, usersController.getUsers); //query params filter

    router.post(`${baseUrl}/`, usersController.createUser);

    router.put(`${baseUrl}/update-username`, usersController.updateUserName);

    return router;
};