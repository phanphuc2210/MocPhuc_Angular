var Invoice = require('../models/invoice.model')


exports.invoice = (req, res) => {
    const orderId = req.params.orderId
    Invoice.getInvoiceByOrderId(orderId, (response) => {
        res.send({result: response})
    })
}

exports.invoiceList = (req, res) => {
    const userId = req.params.userId
    Invoice.getInvoiceList(userId, (response) => {
        res.send({result: response})
    })
}

exports.statistical = (req, res) => {
    var query = req.query
    Invoice.getStatis(query, (response) => {
        res.send({result: response})
    })
}