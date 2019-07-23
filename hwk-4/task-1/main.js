
class promisifyHelper {
    constructor() {}

    static promisify(func) {
        return function () {
            return new Promise((resolve, reject) => {
                func(...arguments, (err, fileData) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(fileData);
                });
            });
        }
    }
}

module.exports = promisifyHelper.promisify;
