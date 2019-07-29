const usersDB = require('../../DataBase/db.users');

class UserRepository {
    getUsers() {
        return usersDB.users;
    }

    saveUser(userData) {
        usersDB.users.push(userData);
    }
}

module.exports = new UserRepository();