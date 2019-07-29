const appConfig = require('../../../config/app.env.config');

module.exports = (app_v = appConfig.versioning.app_version) => {
    const BASE_URL = `http://localhost:${appConfig.server.port}/api/${app_v}`;
    const EDIT = `${BASE_URL}/edit`;
    const ADD_TODO_ITEM = `${BASE_URL}/add`;
    const EDIT_TODO_ITEM = `${BASE_URL}/edit/:key`;
    const DELETE_TODO_ITEM = `${BASE_URL}/delete`;
    const GET_TODO_LIST = `${BASE_URL}/get-todo-list`;

    return {
        BASE_URL,
        EDIT,
        ADD_TODO_ITEM,
        EDIT_TODO_ITEM,
        DELETE_TODO_ITEM,
        GET_TODO_LIST
    }
};
