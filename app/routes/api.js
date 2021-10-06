const router = require('express').Router()


router.use('/admin', require('./admin.routes'))
router.use('/public', require('./public.routes'))
router.get('/', (req, res) => {
    res.send('Server Up and Running')
})

module.exports = router
