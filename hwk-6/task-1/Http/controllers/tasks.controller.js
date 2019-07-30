const tasksRepository = require('../repositories/tasks.repository');

class TasksController {
    deleteCompletedTasks(req, res) {
        return tasksRepository.deleteCompletedTasks(req.body)
            .then(response => {
                res
                    .status(201)
                    .send(response);
            })
            .catch(err => {
                res
                    .status(400)
                    .send(err);
            });
    }

    createTask(req, res) {
        const taskData = {
            ...req.body,
            created: new Date(),
            updated: new Date(),
        };

        return tasksRepository.createTask(taskData)
            .then(response => {
                res
                    .status(201)
                    .send(response);
            })
            .catch(err => {
                res
                    .status(400)
                    .send(err);
            });
    }

    updateTask(req, res) {
        return tasksRepository.updateTask(req.body)
            .then(response => {
                res
                    .status(201)
                    .send(response);
            })
            .catch(err => {
                res
                    .status(400)
                    .send(err);
            });
    }

    getSortedUncompletedTasks(req, res) {
        return tasksRepository.getSortedUncompletedTasks()
            .then(tasks => {
                res
                    .status(201)
                    .send(tasks);
            })
            .catch(err => {
                res
                    .status(400)
                    .send(err);
            });
    }
}

module.exports = new TasksController();