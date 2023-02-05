var express = require('express')
var router = express.Router()
var typeController = require('../controllers/type.controller')

router.get('/', typeController.list)


module.exports = router