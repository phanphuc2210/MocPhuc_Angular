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