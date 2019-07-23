
class promisifyHelper {
    constructor() {}

    static promisify(func) {
        return function () {
            return new Promise((resolve, reject) => {
                func(...arguments, (err, fileData) => {
                    return err ? reject(err) : resolve(fileData);
                });
            });
        }
    }
}

module.exports = promisifyHelper.promisify;
