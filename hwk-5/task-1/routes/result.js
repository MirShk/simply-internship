const express = require('express');
const router = express.Router();

module.exports = (app_v) => {
    const baseUrl = `/api/${app_v}/result`;

    router.get(baseUrl, (req, res) => {
        res.render('result', { users });
    });

    return router;
};