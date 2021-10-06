const router = require('express').Router();
const jobController = require('../controllers/jobs.controller');
const jobValidator = require('../validators/job.validator');
const validate = require('../helpers/validate.helper');
const tryCatch = require('../helpers/tryCatch.helper');


//jobs
router.post('/job/create', [jobValidator.create(), validate], tryCatch(jobController.create));
router.get('/job/list', tryCatch(jobController.list));



module.exports = router;