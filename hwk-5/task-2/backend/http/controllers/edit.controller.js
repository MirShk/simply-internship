const indexRepository = require('../repository/edit.repository');

class EditController {
    editTodoItem(req, res) {
        indexRepository.editTodoItem(req.params.itemId, req.body.text)
            .then(response => {
                res
                    .status(200)
                    .send(response);
            })
            .catch(err => {
                console.log(err);

                res
                    .status(400)
                    .send(err);
            })
    }
}

module.exports = new EditController();