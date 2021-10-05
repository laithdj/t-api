const constants = require('../helpers/constants.helpers')

exports.bootstrap = (app) => {
    app.use('/api/v1', require('./api'))
    app.all('*', (req, res) => {
    res.status(404).send({
        status: false,
        message: constants.URL_NOTFOUND
    })
})
}