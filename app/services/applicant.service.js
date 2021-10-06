const User = require('../models/user.model');


module.exports = {
    create: async (obj) => {
        const user = new User(obj);
        return await user.save();
    },
    find: async (id) => {
        return await User.findOne({ _id: id });
    },
    findByQuery: async (match) => {
        return await User.find(match);
    },
    get: async (match, limit, page) => {
        return await User.find(match)
            .limit(limit)
            .skip(limit * page).sort({ active: -1 })
    },
    count: async (match) => {
        return await User.countDocuments(match);
    },
}



//  applicationDetails: {
//     intendedDegree: ""
//     propoosedStartDate: ""
//     sponser: ""
//     tutionFeeMode: ""
// }
// contact: ""
// countryOfBirth: ""
// dateOfBirth: ""
// declaration: {
//     date: Tue Oct 05 2021 21: 34: 23 GMT + 0500(Pakistan Standard Time) { }
//     firstName: ""
//     lastName: ""
//     middleName: "" //optional
//     signature: "" //png, optional
// }

// educationDetails: [{ instituteName: '', country: '', attendedFrom: '' }]

// educationQualification: [{ subject: '', level: '', grade: '', date: '' }]
// email: ""
// englishProficiency: [{ certificateName: '', grade: '', date: '' }]
// gender: "" //male, female
// guardian: {
//     guardianAddress: "" //optional
//     guardianContact: ""
//     guardianName: ""
//     guardianRelationship: ""
// }
// homeAddress: {
//     city: ""
//     country: ""
//     postalCode: ""
//     stateOrProvince: ""
//     streetAddressLine1: "" //optinal
//     streetAddressLine2: ""
// }
// name:
// firstName: ""
// lastName: ""
// middleName: "" //optional
// nationality: ""
// statement: ""
//  sponser: " " //optional