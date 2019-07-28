const userRepository = require('../../Http/repository/users.repository');
const utils = require('../../../utils/user.validator');

class UserController {
    getUsers(req, res) {
        const usersList = userRepository.getUsers();
        res
            .status(200)
            .send(usersList)
    }

    saveUser(req, res) {
        if (utils.validate(req.body).userDataIsValid) {
            userRepository.saveUser(req.body);
            res
                .status(201)
                .send('An user has been saved successfully!');
        } else {
            res
                .status(403)
                .send(utils.validate(req.body));
        }

    }
}

module.exports = new UserController();