var express = require('express')
var router = express.Router()
var authMiddleware = require('../common/authMiddleWare')
var cartController = require('../controllers/cart.controller')

router.get('/:id',authMiddleware.isAuth,cartController.cartOfUser)
router.post('/', authMiddleware.isAuth,cartController.add)
router.post('/payment', authMiddleware.isAuth,cartController.payment)
// router.put('/:id',cartController.update)
router.delete('/remove/:userId/:productId', authMiddleware.isAuth,cartController.remove)
router.delete('/:userId', authMiddleware.isAuth,cartController.clear)
router.delete('/:userId/:productId',authMiddleware.isAuth,cartController.decrease)

module.exports = router