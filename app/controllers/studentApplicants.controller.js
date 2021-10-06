const constants = require('../helpers/constants.helpers');
const studentApplicationService = require("../services/studentApplication.service");
const apiResp = require('../helpers/apiResponse.helper');
const expressFile = require('../helpers/expressFileUpload.helper')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const emailHelper = require('../helpers/email.helper');
module.exports = {

  application: async (req, res) => {
    const { applicationDetails, contact, countryOfBirth, dateOfBirth,
      declaration, educationDetails, educationQualification, email,
      englishProficiency, gender, guardian, homeAddress, name,
      nationality, statement } = req.body
    let studentSign = '';
    if (req.files) {
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
    // let pdfDoc = new PDFDocument;
    // pdfDoc.pipe(fs.createWriteStream('StudentApplicantionForm.pdf'));
    // pdfDoc.text(data);
    // pdfDoc.end();

    // const result = await expressFile.uploadFile(pdfDoc, process.env.applicantsResume)
    // if (!result.status) {
    //   console.log('sdsdsd')
    //   throw new Error(result.message)
    // }
    // resume = result.message


    apiResp.sendData(res, data, constants.DATA_LOADED)
    // to, subject, template, data
    // emailHelper.send('mshahzeb793@gmail.com', 'Student Applied', 'studentApplication', { name: declaration.firstName, degree: applicationDetails.intendedDegree }, result.message)
  }
}