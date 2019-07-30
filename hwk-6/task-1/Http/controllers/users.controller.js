const usersRepository = require('../repositories/users.repository');

class UsersController {
    getUsers(req, res) {
        return usersRepository.getUsers(req.query)
            .then(users => {
                res
                    .status(201)
                    .send(users);
            })
            .catch(err => {
                res
                    .status(400)
                    .send(err);
            });
    }

    createUser(req, res) {
        return usersRepository.createUser(req.body)
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

    updateUserName(req, res) {
        return usersRepository.updateUserName(req.body)
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
}

module.exports = new UsersController();