const mongoose = require('mongoose');
const constants = require('../helpers/constants.helpers')
const schema = mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        default: null
    },
    skypeId: {
        type: String,
        default: null
    },
    role: {
        type: String,
        required: true,
    },
    address: [{
        country: String,
        state: String,
        city: String
    }, { _id: false }],

    skills: {
        type: Array,
        default: null
    },
    image: {
        type: String,
        default: null
    },


    active: {
        type: Boolean,
        default: true
    },


}, { timestamps: true })

module.exports = mongoose.model(constants.USER_MODEL, schema)