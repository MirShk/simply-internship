class EditRepository {
    renderEdit(itemId) {

    }

    editTodoItem(key, value) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < globals.todoList.length; ++i)  {
                if (globals.todoList[i].key == key) {
                    globals.todoList[i].value = value;

                    resolve(globals.todoList);
                }
            }
        });
    }
}

module.exports = new EditRepository();