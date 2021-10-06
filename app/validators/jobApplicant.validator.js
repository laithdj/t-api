const { body } = require('express-validator')
const constants = require('../helpers/constants.helpers')
module.exports = {
    apply: () => {
        return [
            body('email', constants.EMAIL_REQUIRED)
                .isEmail()
                .trim()
                .notEmpty(),
            body('name', constants.NAME_REQUIRED)
                .notEmpty(),
        ]
    }
}