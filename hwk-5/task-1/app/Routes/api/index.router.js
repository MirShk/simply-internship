const express = require('express');
const router = express.Router();
const indexController = require('../../Http/controllers/index.controller');

module.exports = (app_v) => {
   const baseUrl = `/api/${app_v}/`;

   router.get(baseUrl, indexController.renderIndex);

   return router;
};


