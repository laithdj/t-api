const router = require('express').Router();
const tryCatch = require('../helpers/tryCatch.helper');
const jobController = require('../controllers/admin/jobs.controller')
const jobValidator = require('../validators/job.validator')
const validate = require('../helpers/validate.helper');

// dashboard 
router.get('/job/find/:_id', [jobValidator.find(), validate], tryCatch(jobController.find));
router.get('/job/list', tryCatch(jobController.list));

module.exports = router;