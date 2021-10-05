const { body, param } = require('express-validator')
const constants = require('../helpers/constants.helpers')
module.exports = {
    create: () => {
        return [
            body('title', constants.TITLE_REQUIRED)
                .trim()
                .notEmpty(),
            body('description', constants.DESCRIPTION_REQUIRED)
                .notEmpty(),
        ]
    },
    update: () => {
        return [
            body('_id', constants.ID_REQUIRED)
                .notEmpty(),
            body('title', constants.TITLE_REQUIRED)
                .trim()
                .notEmpty(),
            body('description', constants.DESCRIPTION_REQUIRED)
                .notEmpty(),
        ]
    },
    find: () => {
        return [
            param('_id', constants.ID_REQUIRED)
                .notEmpty()
        ]
    },
}
