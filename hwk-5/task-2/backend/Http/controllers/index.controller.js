const indexRepository = require('../repository/index.repository');

class IndexController {
    addTodo(req, res) {
        indexRepository.addTodo(req.body);
        res
            .status(201)
            .send('added');
    }

    deleteTodo(req, res) {
        indexRepository.deleteTodo(req.params.itemKey)
            .then(todoList => {
                res
                    .status(200)
                    .send(todoList);
            })
            .catch(err => {
                res
                    .status(401)
                    .send(err);
            })
    }

    getTodoList(req, res) {
        res
            .status(200)
            .send(indexRepository.getTodoList());
    }

    renderIndex(req, res) {
        res
            .status(200)
            .render('index.html')
    }
}

module.exports = new IndexController();