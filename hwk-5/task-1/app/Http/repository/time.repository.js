const moment = require('moment');

class TimeRepository {
    getTime(timeData) {
        return timeData.currentTime ?
            { current_time: timeData.currentTime } :
            { current_time: moment().format("HH:mm:ss") } ;
    }
}

module.exports = new TimeRepository();