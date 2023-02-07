var Cart = require('../models/cart.model')

exports.cartOfUser = (req, res) => {
    const id = req.params.id
    Cart.getCartByUserId(id, (response) => {
        res.send({result: response})
    })
}

exports.add = (req, res) => {
    var data = req.body
    Cart.create(data, (response) => {
        res.send({result: response})
    })
}

// exports.update = (req, res) => {
//     var id = req.params.id
//     var data = req.body
//     Cart.update(id, data,(response) => {
//         res.send({result: response})
//     })
// }

exports.remove = (req, res) => {
    var userId = req.params.userId
    var productId = req.params.productId
    Cart.remove(userId, productId, (response) => {
        res.send({result: response})
    })
}

exports.decrease = (req, res) => {
    var userId = req.params.userId
    var productId = req.params.productId
    Cart.decrease(userId, productId, (response) => {
        res.send({result: response})
    })
}

exports.clear = (req, res) => {
    var userId = req.params.userId
    Cart.clear(userId, (response) => {
        res.send({result: response})
    })
}

exports.payment = (req, res) => {
    var data = req.body
    Cart.payment(data, (response) => {
        res.send({result: response})
    })
}

exports.sendMail = (req, res) => {
    var data = req.body
    Cart.sendMail(data, (response) => {
        res.send({result: response})
    })
}

