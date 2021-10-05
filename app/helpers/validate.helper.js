const { validationResult } = require('express-validator')
const apiResp = require('./apiResponse.helper')

module.exports = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  return apiResp.sendValidationError(res, errors)
}
