const express = require('express');
const router = express.Router();

module.exports = (app_v) => {
   const baseUrl = `/api/${app_v}/`;

   router.get(baseUrl, (req, res) => {
      res.render('index', { currentTime: req.cookies.currentTime });
   });

   return router;
};


