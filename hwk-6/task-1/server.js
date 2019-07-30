const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv'); dotenv.config();
const appConfig = require('./Configs/app.env.config');
const usersRouter = require('./Routes/api/users.router');
const tasksRouter = require('./Routes/api/tasks.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

app.use('/', usersRouter(appConfig.versioning.app_version));
app.use('/', tasksRouter(appConfig.versioning.app_version));

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});

mongoose.connect('mongodb://localhost:27017/js_classes', { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to the mongoDB");
        app.listen(3000, () => {
            console.log(`The server is running on 3000 port`);
        });
    })
    .catch(err => {
        throw err;
    });
