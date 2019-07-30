const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String,
    gender   : String,
});

userSchema.statics.getUsers = function(options) {
    let getUsersByOptionsQuery = this
                                    .find({})
                                    .select({ 'username' : 1, '_id': 0});

    if (options) {
        if (options.sort && options.sortBy) {
            getUsersByOptionsQuery = getUsersByOptionsQuery.sort( options.sortBy);
        }

        if (options.whereFieldName) {
            getUsersByOptionsQuery = getUsersByOptionsQuery
                                        .where(options.whereFieldName)
                                        .equals(options.whereValue);
        }
    }

    return getUsersByOptionsQuery;
};

userSchema.statics.updateUserName = function(userData) {
    return this.updateOne(
        {
            _id: userData.id
        },
        {
            $set: {
                username: userData.username
            }
        }
    );
};

module.exports = mongoose.model('users', userSchema);