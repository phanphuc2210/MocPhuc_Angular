var express = require('express')
var router = express.Router()
var authMiddleware = require('../common/authMiddleWare')
var invoiceController = require('../controllers/invoice.controller')

router.get('/statistical', authMiddleware.checkAdmin,invoiceController.statistical)
router.get('/next-status/:orderId', invoiceController.nextStatus)
router.patch('/update-status', invoiceController.updateStatus)
router.get('/:orderId',invoiceController.invoice)
router.get('/list/:userId',invoiceController.invoiceList)

module.exports = router