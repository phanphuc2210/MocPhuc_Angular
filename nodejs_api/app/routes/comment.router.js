var express = require('express')
var router = express.Router()
var authMiddleware = require('../common/authMiddleWare')
var commentController = require('../controllers/comment.controller')

router.get('/:userId/:productId', commentController.detail)
router.get('/:productId', commentController.list)
router.post('/', authMiddleware.isAuth, commentController.add)


module.exports = router