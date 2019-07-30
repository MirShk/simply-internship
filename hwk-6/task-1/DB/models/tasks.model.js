const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title : String,
    text : String,
    completed : Boolean,
    created : Date,
    updated : Date
});

taskSchema.statics.updateTask = function(taskData) {
    return this.updateOne(
        {
            _id: taskData.id
        },
        {
            $set: {
                completed: taskData.completed
            }
        }
    );
};

taskSchema.statics.deleteCompletedTasks = function() {
    return this
            .deleteMany()
            .where('completed')
            .equals(true);
};

taskSchema.statics.getSortedUncompletedTasks = function() {
    return this
        .find({})
        .sort({'created' : 1})
        .where('completed')
        .equals(false);
};


module.exports = mongoose.model('tasks', taskSchema);