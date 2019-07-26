const express = require('express');
const router = express.Router();

module.exports = (app_v) => {
    const baseUrl = `/api/${app_v}/form`;

    router.get(baseUrl, (req, res) => {
        res.render('form');
    });

    router.post(baseUrl, (req, res) => {
        users.push(req.body);
        res.redirect(`/api/${app_v}/result`);
    });

    return router;
};