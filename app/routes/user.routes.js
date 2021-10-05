const router = require('express').Router();
const studentApplicationController = require('../controllers/user/studentApplicants.controller')
const validate = require('../helpers/validate.helper')
const tryCatch = require('../helpers/tryCatch.helper');

// dashboard 
router.post('/student-application', tryCatch(studentApplicationController.application));


module.exports = router;