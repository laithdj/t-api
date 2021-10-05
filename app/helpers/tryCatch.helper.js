const apiResp = require('./apiResponse.helper');

module.exports = (controller) => {
    return async (req, res, next) => {
              try {
                await controller(req, res);
              } catch (ex) {
                next(apiResp.sendError(res, ex.message))
              }
            }
}
