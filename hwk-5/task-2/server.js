const express = require('express');
const dotenv = require('dotenv'); dotenv.config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const appConfig = require('./config/app.env.config');

const indexRouter = require('./backend/Routes/api/index.router');
const editRouter = require('./backend/Routes/api/edit.router');

const app = express();

app.set('views', path.join(__dirname, 'client/src'));
//app.set('view engine', 'pug');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./client/dist'));

app.use('/', indexRouter(appConfig.versioning.app_version));
app.use('/', editRouter(appConfig.versioning.app_version));

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});

app.listen(appConfig.server.port, () => {
    console.log(`The server is running on ${appConfig.server.port} port`);
});