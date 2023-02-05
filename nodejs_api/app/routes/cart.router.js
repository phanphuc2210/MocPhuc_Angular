var express = require('express')
var router = express.Router()
var authMiddleware = require('../common/authMiddleWare')
var cartController = require('../controllers/cart.controller')

router.get('/statistical', authMiddleware.isAuth, authMiddleware.checkAdmin,cartController.statistical)
router.get('/:id',cartController.cartOfUser)
router.post('/', authMiddleware.isAuth,cartController.add)
router.get('/invoice/:orderId', authMiddleware.isAuth,cartController.invoice)
router.get('/invoice/list/:userId', authMiddleware.isAuth ,cartController.invoiceList)


router.post('/payment', authMiddleware.isAuth,cartController.payment)
// router.put('/:id',cartController.update)
router.delete('/remove/:userId/:productId', authMiddleware.isAuth,cartController.remove)
router.delete('/:userId', authMiddleware.isAuth,cartController.clear)
router.delete('/:userId/:productId',authMiddleware.isAuth,cartController.decrease)

module.exports = router