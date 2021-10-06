const Job = require('../models/job.model');


module.exports = {
    create: async (obj) => {
        const job = new Job(obj);
        return await job.save();
    },
    findByQuery: async (match) => {
        return await Job.find(match);
    },
    get: async (match, limit, page) => {
        return await Job.find(match)
            .limit(limit)
            .skip(limit * page).sort({ active: -1 })
    },
    count: async (match) => {
        return await Job.countDocuments(match);
    },
}