const indexRepository = require('../repository/index.repository');

class IndexController {
    addTodo(req, res) {
        indexRepository.addTodo(req.body)
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

    deleteTodo(req, res) {
        indexRepository.deleteTodo(req.params.itemKey)
            .then(response => {
                res
                    .status(200)
                    .send(response);
            })
            .catch(err => {
                res
                    .status(400)
                    .send(err);
            })
    }

    getTodoList(req, res) {
        indexRepository.getTodoList()
            .then(todoList => {
                res
                    .status(200)
                    .send(todoList);
            })
            .catch(err => {
                res
                    .status(400)
                    .send(err);
            });

    }

    renderIndex(req, res) {
        res
            .status(200)
            .render('index.html')
    }
}

module.exports = new IndexController();