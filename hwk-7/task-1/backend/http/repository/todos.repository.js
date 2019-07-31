const todoItemsModel = require('../../db/models/todo.items.model');

class TodosRepository {
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

    editTodoItem(key, value) {
        return todoItemsModel.editTodoItem(key, value);
    }
}

module.exports = new TodosRepository();