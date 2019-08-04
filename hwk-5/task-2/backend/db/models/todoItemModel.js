const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoItemSchema = new Schema({
    text : String,
    completed: Boolean
});

todoItemSchema.pre('save', function(next) {
    if (!this.text.replace(/\s/g, '').length) {
        next({message: 'todo item validation is failed'});
    } else {
        next();
    }
});

todoItemSchema.pre('updateOne', function(next) {
    if (
        this._update.$set.text &&
        !this._update.$set.text.replace(/\s/g, '').length
    ) {
        next({message: 'todo item validation is failed'});
    }

    next();
});

todoItemSchema.statics.getAllTodoItems = function() {
    return this.find();
};

todoItemSchema.statics.deleteTodoItem = function(itemKey) {
    return this.deleteOne({_id: itemKey});
};

todoItemSchema.statics.editTodoItem = function(itemKey, editableFields) {
    return this.updateOne(
        {
            _id: itemKey
        },
        {
            $set: editableFields
        }
    );
};

module.exports = mongoose.model('todo_items', todoItemSchema);