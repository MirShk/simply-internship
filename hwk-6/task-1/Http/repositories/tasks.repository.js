const taskModel = require('../../DB/models/tasks.model');

class TasksRepository {
    createTask(taskData) {
        const newTask = new taskModel(taskData);
        return newTask.save();
    }

    deleteCompletedTasks() {
        return taskModel.deleteCompletedTasks();
    }

    updateTask(taskData) {
        taskData = {
            updated: new Date(),
            ...taskData
        };
        return taskModel.updateTask(taskData);
    }

    getSortedUncompletedTasks() {
        return taskModel.getSortedUncompletedTasks();
    }
}

module.exports = new TasksRepository();