const apiResp = require('../helpers/apiResponse.helper')
const userService = require('../services/applicant.service')
const constants = require('../helpers/constants.helpers')
const jwt = require('jsonwebtoken')
module.exports = {
    authenticate: async (req, res, next) => {
        let token = req.headers.authorization;
        if (!token) {
            return apiResp.sendError(res, constants.TOKEN_MISSING)
        }
        try {
            const row =  jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await userService.find(row._id);
                if (!user) {
                    return apiResp.sendError(res, constants.USER_NOT_FOUND)
                }
                req.body.user = user;
            next();
        }
        catch (error) {
            return apiResp.sendError(res, constants.INVALID_TOKEN , constants.UNAUTHORIZE_CODE)
            
        }
    }
}