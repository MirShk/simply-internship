const indexRepository = require('../repository/index.repository');

class IndexController {
    renderIndex(req, res) {
        res.render('index', { currentTime: req.cookies.currentTime });
    }
}

module.exports = new IndexController();
