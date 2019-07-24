
class promisifyHelper {
    constructor() {}

    static promisify(func) {
        return function () {
            return new Promise((resolve, reject) => {
                func(...arguments, (err, data) => {
                    return err ? reject(err) : resolve(data);
                });
            });
        }
    }
}

module.exports = promisifyHelper.promisify;
