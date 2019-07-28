const myrouteRepository = require('../repository/myroute.repository');

class MyrouteController {
    collectData(req, res) {
        const collectedData = myrouteRepository.collectData(req);
        res.status(200);
        res.render('myroute', { collectedData });
    }
}

module.exports = new MyrouteController();

