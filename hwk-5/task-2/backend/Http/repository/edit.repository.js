const todoList = require('../DataBase/todoItems');

class EditRepository {
    editTodoItem(value, key) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < todoList.length; ++i)  {
                if (todoList[i].key == key) {
                    todoList[i].text = value;
                    return resolve(todoList);
                }
            }
        });
    }
}

module.exports = new EditRepository();