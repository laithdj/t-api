const router = require('express').Router()
const authMiddleware = require('../middlewares/auth.middleware')


router.use('/auth', require('./auth.routes'))
router.use('/admin', require('./admin.routes'))
router.use('/public', require('./public.routes'))
// router.use('/admin',[authMiddleware.authenticate], require('./admin.routes'))
router.use('/user', require('./user.routes'))
router.get('/', (req, res) => {
    res.send('Server Up and Running')
})

module.exports = router
