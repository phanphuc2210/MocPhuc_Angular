var Product = require('../models/product.model')

exports.list = (req, res) => {
    var query = req.query
    Product.getAll(query, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.detail = (req, res) => {
    const id = req.params.id
    Product.getById(id, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.add = (req, res) => {
    var data = req.body
    Product.create(data, (response) => {
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
    Product.update(id, data,(response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.remove = (req, res) => {
    var id = req.params.id
    Product.delete(id, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}