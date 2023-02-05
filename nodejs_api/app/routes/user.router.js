var express = require('express')
var router = express.Router()
var userController = require('../controllers/user.controller')

router.get('/customer', userController.listCustomer)
router.get('/admin', userController.listAdmin)
router.get('/:id', userController.detail)
router.put('/:id', userController.update)
router.delete('/:id', userController.remove)

module.exports = router