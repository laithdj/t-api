const mongoose = require('mongoose');
const constants = require('../helpers/constants.helpers')
const schema = mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.JOB_MODEL,

    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String
    },
    resume: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model(constants.JOB_APPLICATION_MODEL, schema)