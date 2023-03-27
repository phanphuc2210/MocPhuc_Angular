var Invoice = require('../models/invoice.model')


exports.invoice = (req, res) => {
    const orderId = req.params.orderId
    Invoice.getInvoiceByOrderId(orderId, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.invoiceList = (req, res) => {
    const userId = req.params.userId
    Invoice.getInvoiceList(userId, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.nextStatus = (req, res) => {
    const orderId = req.params.orderId
    Invoice.getNextStatusByOrderId(orderId, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.status = (req, res) => {
    const orderId = req.params.orderId
    Invoice.getListStatusByOrderId(orderId, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.updateStatus = (req, res) => {
    const data = req.body
    Invoice.updateStatus(data, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}

exports.statistical = (req, res) => {
    var query = req.query
    Invoice.getStatis(query, (response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}