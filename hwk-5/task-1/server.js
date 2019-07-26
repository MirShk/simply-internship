const express = require('express');
const dotenv = require('dotenv'); dotenv.config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const currentTimeCookieSetter = require('./middlwares/cookie.current_time_setter');
const indexRouter = require('./routes');
const myRouter = require('./routes/myroute');
const formRouter = require('./routes/form');
const resultRouter = require('./routes/result');

global.envConfig = require('./config/app.env.config');
global.users = [];

const app = express();

//app.locals({});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(currentTimeCookieSetter);

app.use('/', indexRouter(envConfig.versioning.app_version));
app.use('/', myRouter(envConfig.versioning.app_version));
app.use('/', formRouter(envConfig.versioning.app_version));
app.use('/', resultRouter(envConfig.versioning.app_version));




module.exports = app;
