var express = require('express')
var router = express.Router()
var authMiddleware = require('../common/authMiddleWare')
var voucherController = require('../controllers/voucher.controller')

router.get('/', voucherController.list)
router.get('/:id', voucherController.detail)
router.get('/user/:userId', voucherController.listByUser)

router.post('/save', authMiddleware.isAuth, voucherController.save)
router.post('/', authMiddleware.isAuth, authMiddleware.checkAdmin, voucherController.add)
router.put('/:id', authMiddleware.isAuth, authMiddleware.checkAdmin, voucherController.update)
// router.delete('/:id', authMiddleware.isAuth, authMiddleware.checkAdmin,voucherController.remove)



module.exports = router