var Product = require('../models/product.model')

exports.list = (req, res) => {
    var query = req.query
    Product.getAll(query, (response) => {
        res.send({result: response})
    })
}

exports.detail = (req, res) => {
    const id = req.params.id
    Product.getById(id, (response) => {
        res.send({result: response})
    })
}

exports.add = (req, res) => {
    var data = req.body
    Product.create(data, (response) => {
        res.send({result: response})
    })
}

exports.update = (req, res) => {
    var id = req.params.id
    var data = req.body
    Product.update(id, data,(response) => {
        res.send({result: response})
    })
}

exports.remove = (req, res) => {
    var id = req.params.id
    Product.delete(id, (response) => {
        res.send({result: response})
    })
}