var express = require('express')
var router = express.Router()
var authMiddleware = require('../common/authMiddleWare')
var invoiceController = require('../controllers/invoice.controller')

router.get('/statistical', authMiddleware.isAuth, authMiddleware.checkAdmin,invoiceController.statistical)
router.get('/:orderId', authMiddleware.isAuth,invoiceController.invoice)
router.get('/list/:userId', authMiddleware.isAuth ,invoiceController.invoiceList)

module.exports = router