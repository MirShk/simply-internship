const express = require('express');
const dotenv = require('dotenv'); dotenv.config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const currentTimeCookieSetter = require('./app/Http/middlwares/cookie.current_time_setter');
const indexRouter = require('./app/Routes/api/index.router');
const myRouter = require('./app/Routes/api/myroute.router');
const formRouter = require('./app/Routes/api/form.router');
const resultRouter = require('./app/Routes/api/results.router');

global.envConfig = require('./config/app.env.config');
global.app_v = envConfig.versioning.app_version;
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


process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});

app.listen(envConfig.server.port || 3000, () => {
    console.log(`The server is running on ${envConfig.server.port} port`);
});

