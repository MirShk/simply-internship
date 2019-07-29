const usersDB = require('../../DataBase/db.users');

class FormRepository {
    saveFormData(data) {
        usersDB.users.push(data);
    }
}

module.exports = new FormRepository();