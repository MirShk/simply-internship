class UserRepository {
    getUsers() {
        return users;
    }

    saveUser(userData) {
        users.push(userData);
    }
}

module.exports = new UserRepository();