const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const constants = require('./app/helpers/constants.helpers');
const fileUpload = require('express-fileupload');
// const webPush = require('web-push')
require('dotenv').config()
const app = express()

// init middlewares
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
require('./startup/cors')(app)
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
app.use('/public', express.static('public'))
require('./startup/db')()
require('./app/routes').bootstrap(app)
require('./startup/loggin')

// create server
app.listen(process.env.PORT, () => {
    console.log(`${constants.SERVER_RUNNING} ${process.env.PORT}`)
})


// VAPID keys should be generated only once.
// const vapidKeys = webPush.generateVAPIDKeys();
// console.log(vapidKeys)
