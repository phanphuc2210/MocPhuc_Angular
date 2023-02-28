var express = require('express')
var router = express.Router()
var userController = require('../controllers/user.controller')

router.get('/', userController.list)
router.patch('/:id/change-password', userController.changePassword)
router.get('/:id', userController.detail)
router.put('/:id', userController.update)
router.delete('/:id', userController.remove)

module.exports = router