const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todoItemValidator = require('../../../utils/todo.item.validator');

const todoItemSchema = new Schema({
    text : String,
    key  : Number
});

todoItemSchema.statics.getAllTodoItems = function() {
    return this.find();
};

todoItemSchema.statics.deleteTodoItem = function(itemKey) {
    return this.remove({key: itemKey});
};

todoItemSchema.statics.editTodoItem = function(itemKey, itemValue) {
    return this.updateOne(
            {
                key: itemKey
            },
            {
                $set: {
                    text: itemValue
                }
            }
        );
};

module.exports = mongoose.model('todo_items', todoItemSchema);