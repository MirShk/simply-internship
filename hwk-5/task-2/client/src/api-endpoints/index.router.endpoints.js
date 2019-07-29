const appConfig = require('../../../config/app.env.config');

module.exports = (app_v = appConfig.versioning.app_version) => {
    const baseUrl = `http://localhost:${appConfig.server.port}/api/${app_v}`;
    const EDIT = `${baseUrl}/edit`;
    const ADD_TODO_ITEM = `${baseUrl}/add`;
    const EDIT_TODO_ITEM = `${baseUrl}/edit/:key`;
    const DELETE_TODO_ITEM = `${baseUrl}/delete`;
    const GET_TODO_LIST = `${baseUrl}/get-todo-list`;

    return {
        baseUrl,
        EDIT,
        ADD_TODO_ITEM,
        EDIT_TODO_ITEM,
        DELETE_TODO_ITEM,
        GET_TODO_LIST
    }
};
