const todoItemModel = require('../../db/models/todoItemModel');

class IndexRepository {
    addTodo(todoItem) {
        const newTodoItem = new todoItemModel(todoItem);
        return newTodoItem.save();
    }

    deleteTodo(key) {
        return todoItemModel.deleteTodoItem(key);
    }

    getTodoList() {
        return todoItemModel.getAllTodoItems();
    }
}

module.exports = new IndexRepository();