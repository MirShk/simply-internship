const express = require('express');
const router = express.Router();
const formController = require('../../Http/controllers/form.controller');

module.exports = (app_v) => {
    const baseUrl = `/api/${app_v}/form`;

    router.get(baseUrl, formController.renderForm);

    router.post(baseUrl, formController.saveFormData);

    return router;
};