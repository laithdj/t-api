const mongoose = require('mongoose');
const constants = require('../helpers/constants.helpers')
const schema = mongoose.Schema({

    applicationDetails: [{
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
    }, { _id: false }],
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
    }, { _id: false }],
    educationDetails: [{
        instituteName: {
            type: String
        },
        country: {
            type: String
        },
        attendedFrom: {
            type: String
        }
    }, { _id: false }],
    educationQualification: [{
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
    }, { _id: false }],
    email: {
        type: String
    },
    englishProficiency: [{
        certificateName: {
            type: String
        },
        grade: {
            type: String
        },
        date: {
            type: String
        },
    }, { _id: false }],
    gender: {
        type: String
    },
    guardian: [{
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
    }, { _id: false }],
    homeAddress: [{
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
    }, { _id: false }],
    name: [{
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        middleName: {
            type: String
        },
    }, { _id: false }],
    
    nationality: {
        type: String
    },
    statement: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model(constants.STUDENT_APPLICATION_MODEL, schema)




