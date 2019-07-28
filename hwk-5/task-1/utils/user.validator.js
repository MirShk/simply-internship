class UserValidator {
    validate(data) {
        const {username, password, gender, agree} = data;

        if (typeof username !== 'string' || username.length < 6) {
            return {
                userDataIsValid: false,
                fieldName: 'username'
            };
        }

        if (typeof password !== 'string' || password.length < 6) {
            return {
                userDataIsValid: false,
                fieldName: 'password'
            };
        }

        if (!['male', 'female'].includes(gender)) {
            return {
                userDataIsValid: false,
                fieldName: 'gender'
            };
        }

        if (agree !== 'on') {
            return {
                userDataIsValid: false,
                fieldName: 'agree'
            };
        }

        return { userDataIsValid: true };
    }
}

module.exports = new UserValidator();