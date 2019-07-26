const moment = require('moment');

module.exports = (req, res, next) => {
    if (!req.cookies.time) {
        res.cookie('currentTime', moment().format("HH:mm:ss"));
    }
    next();
};