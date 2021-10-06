const Job_Application = require('../models/jobApplicant.model');


module.exports = {
    create: async (obj) => {
        const application = new Job_Application(obj);
        return await application.save();
    },
    findByQuery: async (match) => {
        return await Job_Application.find(match);
    },
}