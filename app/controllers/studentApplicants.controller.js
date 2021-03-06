const constants = require('../helpers/constants.helpers');
const studentApplicationService = require("../services/studentApplication.service");
const apiResp = require('../helpers/apiResponse.helper');
const expressFile = require('../helpers/expressFileUpload.helper')
const emailHelper = require('../helpers/email.helper');
module.exports = {

  application: async (req, res) => {
    console.log(req.body);
    const { applicationDetails, contact, countryOfBirth, dateOfBirth,
      declaration, educationDetails, educationQualification, email,
      englishProficiency, gender, guardian, homeAddress, name,
      nationality, statement } = req.body
    let studentSign = '';
    if (req.files) {
      console.log('enter into signature file')
      const result = await expressFile.uploadFile(req.files.signature, process.env.studentSignature)
      if (!result.status) {
        throw new Error(result.message)
      }
      studentSign = result.message
    }
    const application = {
      applicationDetails,
      contact,
      countryOfBirth,
      dateOfBirth,
      declaration: {
        date: declaration.date,
        firstName: declaration.firstName,
        lastName: declaration.lastName,
        middleName: declaration.middleName,
        signature: studentSign
      },
      educationDetails,
      educationQualification,
      email,
      englishProficiency,
      gender,
      guardian,
      homeAddress,
      name,
      nationality,
      statement
    }

    const data = await studentApplicationService.create(application)

    apiResp.sendData(res, data, constants.DATA_LOADED)
    
    if (req.files) {
      console.log('enter into application file')
      const result = await expressFile.uploadFile(req.files.studentApplication, process.env.studentSignature)
      if (!result.status) {
        throw new Error(result.message)
      }
      // to, subject, template, data
      emailHelper.send('muhammadtariq9619@gmail.com', 'Student Applied', 'studentApplication', { name: declaration.firstName, degree: applicationDetails.intendedDegree }, result.message)
    }
  }
}