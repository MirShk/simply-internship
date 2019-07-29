const indexRepository = require('../repository/edit.repository');

class EditController {
    renderEdit(req, res) {
        res.render('index.html');
    }

    editTodoItem(req, res) {
        indexRepository.editTodoItem(req.body.text, req.params.itemId)
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
}

module.exports = new EditController();