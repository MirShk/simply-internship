const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv'); dotenv.config();
const appConfig = require('./config/app.env.config');
const indexRouter = require('./backend/routes/api/index.router');
const editRouter = require('./backend/routes/api/edit.router');
const app = express();

app.set('views', path.join(__dirname, 'client/src'));
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


//todo
mongoose.connect('mongodb://localhost:27017/todo_app', { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to the mongoDB");
        app.listen(appConfig.server.port, () => {
            console.log(`The server is running on ${appConfig.server.port} port`);
        });
    })
    .catch(err => {
        throw err;
    });

