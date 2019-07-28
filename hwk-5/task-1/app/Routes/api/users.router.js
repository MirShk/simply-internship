const express = require('express');
const router = express.Router();
const userController = require('../../Http/controllers/users.controller');

module.exports = (app_v) => {
    const baseUrl = `/api/${app_v}/users`;

    router.get(baseUrl, userController.getUsers);

    router.post(baseUrl, userController.saveUser);

    return router;
};