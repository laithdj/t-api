const mongoose = require('mongoose');
const constants = require('../helpers/constants.helpers')
const schema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model(constants.JOB_MODEL, schema)