const Student_Application = require('../models/studentApplication.model');


module.exports = {
    create: async (obj) => {
        const application = new Student_Application(obj);
        return await application.save();
    }
}