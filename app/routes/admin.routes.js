const router = require('express').Router();
const jobController = require('../controllers/jobs.controller');
const jobValidator = require('../validators/job.validator');
const validate = require('../helpers/validate.helper');
const tryCatch = require('../helpers/tryCatch.helper');


//jobs
router.post('/job/create', tryCatch(jobController.jobtest));
router.get('/job/list', tryCatch(jobController.list));
router.get('/tst', (req, res) => {
    res.end('Hello World!');
});



module.exports = router;