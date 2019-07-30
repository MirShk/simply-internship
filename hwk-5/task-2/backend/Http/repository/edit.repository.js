const todoItemsModel = require('../../DB/models/todo.items.model');

class EditRepository {
    editTodoItem(key, value) {
        return todoItemsModel.editTodoItem(key, value);
    }
}

module.exports = new EditRepository();