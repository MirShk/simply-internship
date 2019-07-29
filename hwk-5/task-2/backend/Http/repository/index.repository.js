const todoList = require('../DataBase/todoItems');

class IndexRepository {
    addTodo(todoItem) {
        todoList.push(todoItem);
        return todoList;
    }

    deleteTodo(key) {
        return new Promise((resolve, reject) => {
            if (!todoList.length) {
                reject("Can't remove from empty list!!!")
            } else {
                for (let i = 0; i < todoList.length; ++i) {
                    if(todoList[i].key == key) {
                        todoList.splice(i, 1);
                        return resolve(todoList);
                    }
                }
            }
        });
    }

    getTodoList() {
        return todoList;
    }
}

module.exports = new IndexRepository();