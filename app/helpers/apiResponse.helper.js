const errorLogger = require('../../startup/loggin')
module.exports = {
  sendError: (res, err, code) => {
    if (typeof code === 'undefined') {
      code = 200
    }
    errorLogger.error(err.toString())
    return res.status(code).send({
      status: false,
      message: err.toString(),
      error: err
    })
  },
  sendValidationError: (res, errors) => {
    return res.status(422).send({
      status: false,
      message: 'Validation Failed',
      errors: errors.array()
    })
  },
  sendData: (res, data, msg) => {
    return res.status(200).send({
      status: true,
      message: typeof msg === 'undefined' ? '' : msg.toString(),
      data: data
    })
  },
  sendMessage: (res, msg, code) => {
    if (typeof code === 'undefined') {
      code = 200
    }
    return res.status(code).send({
      status: true,
      message: typeof msg === 'undefined' ? '' : msg.toString()
    })
  }
}
