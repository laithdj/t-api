const constants = require('../../helpers/constants.helpers');
const studentApplicationService = require("../../services/studentApplication.service");
const apiResp = require('../../helpers/apiResponse.helper');


module.exports = {

  application: async (req, res) => {
    const { applicationDetails, contact, countryOfBirth, dateOfBirth,
      declaration, educationDetails, educationQualification, email,
      englishProficiency, gender, guardian, homeAddress, name,
      nationality, statement } = req.body

    // if (req.files) {
    //   const result = await expressFile.uploadFile(req.files.signature, process.env.studentSignaturePath)
    //   if (!result.status) {
    //     throw new Error(result.message)
    //   }
    //   const signature = result.message
    // }
    const data = await studentApplicationService.create(req.body)

    apiResp.sendData(res, data, constants.DATA_LOADED)
  }
}