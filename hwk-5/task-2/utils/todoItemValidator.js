class TodoItemValidator {
    static validate(todoItemValue) {
        return todoItemValue.replace(/\s/g, '').length;
    }
}

module.exports = TodoItemValidator;
