const constants = require('../helpers/constants.helpers');
const userService = require('../services/applicant.service');
const apiResp = require('../helpers/apiResponse.helper');
const commonHelper = require('../helpers/common.helper');
const crypto = require('../helpers/crypto.helper');
const emailHelper = require('../helpers/email.helper');
const expressFile = require('../helpers/expressFileUpload.helper');
const jwt = require('../helpers/jwt.helper');
module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    let admin = await userService.findByQuery({ email: email });
    user = admin[0]
    if (!user) {
      return apiResp.sendError(res, constants.INVALID_EMAIL)
    }
    // check active user
    if (!user.active) {
      return apiResp.sendError(res, constants.ACCOUNT_BLOCKED)
    }
    let result = await crypto.verifyPassword(password, user.password);
    if (result) {
      const generatedToken = await jwt.generateToken(user)
      return apiResp.sendData(res, { token: generatedToken }, constants.LOGIN)
    }
    else {
      return apiResp.sendError(res, constants.INVALID_PASSWORD, constants.UNAUTHORIZE_EMAIL_PASSWORD)
    }
  },
  // demo admin
  adminSeed: async (req, res) => {
    const admin = {
      fullName: 'admin',
      email: "admin@gmail.com",
      password: await crypto.encryptPassword('1234567'),
      role: 'admin'

    }
    await userService.create(admin)
    apiResp.sendMessage(res, constants.USER_REGISTRATION_SUCCESS, constants.CREATED_CODE)

  }
}