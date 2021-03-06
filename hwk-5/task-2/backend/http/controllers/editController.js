const indexRepository = require('../repository/editRepository');

class EditController {
    editTodoItem(req, res) {
        indexRepository.editTodoItem(req.params.itemId, req.body)
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