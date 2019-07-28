const indexRepository = require('../repository/edit.repository');

class EditController {
    renderEdit(req, res) {
        res.render('edit.html');
    }

    editTodoItem(req, res) {
        indexRepository.editTodoItem(req.params.key, req.params.value)
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