import appConfig from '../../../config/app.env.config';

module.exports = (app_v = appConfig.versioning.app_version) => {
    const BASE_URL = `http://${appConfig.server.host}:${appConfig.server.port}/api/${app_v}/todos`;
    const ADD_TODO_ITEM = `${BASE_URL}/create`;
    const EDIT_TODO_ITEM = `${BASE_URL}/edit`;
    const DELETE_TODO_ITEM = `${BASE_URL}/delete`;
    const GET_TODO_LIST = `${BASE_URL}/fetch`;

    return {
        BASE_URL,
        ADD_TODO_ITEM,
        EDIT_TODO_ITEM,
        DELETE_TODO_ITEM,
        GET_TODO_LIST
    }
};
