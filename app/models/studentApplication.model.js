const mongoose = require('mongoose');
const constants = require('../helpers/constants.helpers')
const schema = mongoose.Schema({

    applicationDetails: [{
        _id: false,
        intendedDegree: {
            type: String
        },
        propoosedStartDate: {
            type: String
        },
        sponser: {
            type: String
        },
        tutionFeeMode: {
            type: String
        }
    }],
    contact: {
        type: String
    },
    countryOfBirth: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    declaration: [{
        _id: false,
        date: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        middleName: {
            type: String
        },
        signature: {
            type: String
        },
    }],
    educationDetails: [{
        _id: false,
        instituteName: {
            type: String
        },
        country: {
            type: String
        },
        attendedFrom: {
            type: String
        }
    }],
    educationQualification: [{
        _id: false,
        subject: {
            type: String
        },
        level: {
            type: String
        },
        grade: {
            type: String
        },
        date: {
            type: String
        },
    }],
    email: {
        type: String
    },
    englishProficiency: [{
        _id: false,
        certificateName: {
            type: String
        },
        grade: {
            type: String
        },
        date: {
            type: String
        },
    }],
    gender: {
        type: String
    },
    guardian: [{
        _id: false,
        guardianAddress: {
            type: String
        },
        guardianContact: {
            type: String
        },
        guardianName: {
            type: String
        },
        guardianRelationship: {
            type: String
        },
    }],
    homeAddress: [{
        _id: false,
        city: {
            type: String
        },
        country: {
            type: String
        },
        postalCode: {
            type: String
        },
        stateOrProvince: {
            type: String
        },
        streetAddressLine1: {
            type: String
        },
        streetAddressLine2: {
            type: String
        },
    }],
    name: [{
        _id: false,
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        middleName: {
            type: String
        },
    }],
    
    nationality: {
        type: String
    },
    statement: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model(constants.STUDENT_APPLICATION_MODEL, schema)




