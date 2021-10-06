const apiResp = require('./apiResponse.helper');
const constants = require('./constants.helpers')
module.exports = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (ex) {
      const constants = require('./constants.helpers')
      next(apiResp.sendError(res, ex.message, constants.BAD_REQUEST_CODE))
    }
  }
}
