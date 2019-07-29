const resultsRepository = require('../repository/results.repository');
const usersDB = require('../../DataBase/db.users');

class ResultsController {
    renderResults(req, res) {
        res.status(200);
        res.render('result', { users: usersDB.users });
    }
}

module.exports = new ResultsController();
