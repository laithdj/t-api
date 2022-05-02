const mongoose = require('mongoose');
const constants = require('../app/helpers/constants.helpers')


module.exports = async () => {
    // const connectionString = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;

    const connectionString = 'mongodb+srv://Rohail321:d2MC9OhNztkynxwo@cluster0.vnoid.mongodb.net/test?retryWrites=true&w=majority'
    try {
        // const options = {
        //     useNewUrlParser: true,
        //     useCreateIndex: true,
        //     useUnifiedTopology: true
        //     //  keepAlive: 1,
        //     //  connectTimeoutMS: 30000,
        //     //  reconnectTries: 30,
        //     //  reconnectInterval: 5000,
        // }
        // await mongoose.connect(connectionString, options)
        // console.log(constants.DB_CONNECTED)
        mongoose.connect('mongodb+srv://Rohail321:d2MC9OhNztkynxwo@cluster0.opppp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        );

        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
            console.log("Connected successfully");
        });
    }
    catch (error) {
        throw new Error(constants.DB_NOT_CONNECTED, connectionString)
    }
}