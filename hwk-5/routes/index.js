const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.cookies);

  res.render('index', { currentTime: req.cookies.currentTime });
});

module.exports = router;
