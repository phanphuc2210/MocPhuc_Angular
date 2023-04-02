var Voucher = require('../models/voucher.model')

exports.list = (req, res) => {
    const isCustomer = req.query.customer? req.query.customer : false
    Voucher.getAll(isCustomer, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.listByUser = (req, res) => {
    const userId = req.params.userId
    Voucher.getAllByUser(userId, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.detail = (req, res) => {
    const id = req.params.id
    Voucher.getById(id, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.add = (req, res) => {
    var data = req.body
    Voucher.create(data, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.save = (req, res) => {
    var data = req.body
    Voucher.saveVoucher(data, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.update = (req, res) => {
    var id = req.params.id
    var data = req.body
    Voucher.update(id, data,(response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

// exports.remove = (req, res) => {
//     var id = req.params.id
//     Wood.delete(id, (response) => {
//         if(response.error) {
//             res.status(400).send({message: response.error})
//         } else {
//             res.send(response)
//         }
//     })
// }
