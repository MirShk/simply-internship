const resultsRepository = require('../repository/results.repository');

class ResultsController {
    renderResults(req, res) {
        res.status(200);
        res.render('result', { users });
    }
}

module.exports = new ResultsController();
