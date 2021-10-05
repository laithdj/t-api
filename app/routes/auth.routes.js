const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validate = require('../helpers/validate.helper');
const tryCatch = require('../helpers/tryCatch.helper')

router.post('/login', tryCatch(authController.login));
// admin seeder
router.post('/admin/seed', tryCatch(authController.adminSeed));
module.exports = router;