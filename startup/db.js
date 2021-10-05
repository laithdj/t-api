const mongoose = require('mongoose');
const constants = require('../app/helpers/constants.helpers')

module.exports = async () => {
    // const connectionString = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;

    const connectionString = process.env.ATLAS_DB
    try {
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
            //  keepAlive: 1,
            //  connectTimeoutMS: 30000,
            //  reconnectTries: 30,
            //  reconnectInterval: 5000,
        }
        await mongoose.connect(connectionString, options)
        console.log(constants.DB_CONNECTED)
    }
    catch (error) {
        throw new Error(constants.DB_NOT_CONNECTED, connectionString)
    }
}