const userModel = require('../../DB/models/users.model');

class UserRepository {
    createUser(userData) {
        const newUser = new userModel(userData);
        return newUser.save();
    }

    getUsers(options) {
        return userModel.getUsers(options);
    }

    updateUserName(userData) {
        return userModel.updateUserName(userData);
    }
}

module.exports = new UserRepository();
