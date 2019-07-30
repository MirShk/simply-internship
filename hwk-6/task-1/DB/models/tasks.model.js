const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title : String,
    text : String,
    completed : Boolean,
    created : Date,
    updated : Date
});

module.exports = mongoose.model('tasks', taskSchema);