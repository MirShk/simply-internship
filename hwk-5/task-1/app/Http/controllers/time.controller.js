const timeRepository = require('../repository/time.repository');

class TimeController {
    getTime(req, res) {
        res
            .status(200)
            .send(timeRepository.getTime(req.cookies))
    }

}

module.exports = new TimeController();