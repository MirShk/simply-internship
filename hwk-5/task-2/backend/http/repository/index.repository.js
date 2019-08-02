const todoItemsModel = require('../../db/models/todo.items.model');

class IndexRepository {
    addTodo(todoItem) {
        const newTodoItem = new todoItemsModel(todoItem);
        return newTodoItem.save();
    }

    deleteTodo(key) {
        return todoItemsModel.deleteTodoItem(key);
    }

    getTodoList() {
        return todoItemsModel.getAllTodoItems();
    }
}

module.exports = new IndexRepository();