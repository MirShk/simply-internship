const userRepository = require('../../Http/repository/users.repository');

class UserController {
    getUsers(req, res) {
        const usersList = userRepository.getUsers();
        res
            .status(200)
            .send(usersList)
    }

    saveUser(req, res) {
        userRepository.saveUser(req.body);
        res
            .status(200)
            .send('An user has been saved successfully!')
    }
}

module.exports = new UserController();