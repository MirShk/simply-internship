
module.exports = (app_v) => {
    const baseUrl = `http://localhost:3000/api/${app_v}`;
    const EDIT = `${baseUrl}/edit`;
    const ADD_TODO_ITEM = `${baseUrl}/add`;
    const EDIT_TODO_ITEM = `${baseUrl}/edit/:key`;
    const DELETE_TODO_ITEM = `${baseUrl}/delete`;

    return {
        baseUrl,
        EDIT,
        ADD_TODO_ITEM,
        EDIT_TODO_ITEM,
        DELETE_TODO_ITEM
    }
};
