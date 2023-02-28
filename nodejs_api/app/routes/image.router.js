var express = require('express')
var router = express.Router()
var authMiddleware = require('../common/authMiddleWare')
var imageController = require('../controllers/image.controller')


router.get('/:productId', imageController.list)

router.post('/', authMiddleware.isAuth, authMiddleware.checkAdmin, imageController.add)
router.put('/:id', authMiddleware.isAuth, authMiddleware.checkAdmin,imageController.update)
// router.delete('/all/:productId', authMiddleware.isAuth, authMiddleware.checkAdmin,imageController.removeAll)
router.delete('/:id', authMiddleware.isAuth, authMiddleware.checkAdmin,imageController.remove)


module.exports = router