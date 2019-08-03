const todoItemsModel = require('../../db/models/todo.items.model');

class EditRepository {
    editTodoItem(key, reqBody) {
        const editableFields = {};
        if (reqBody.completed !== undefined) editableFields.completed = reqBody.completed;
        if (reqBody.text !== undefined) editableFields.text = reqBody.text;

        return todoItemsModel.editTodoItem(key, editableFields);
    }
}

module.exports = new EditRepository();