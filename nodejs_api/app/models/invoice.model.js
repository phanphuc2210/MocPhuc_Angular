const db = require('../db/connect')

const Invoice = (invoice) => {
    this.id = invoice.id
    this.date = invoice.date
    this.address = invoice.address
    this.phone = invoice.phone
    this.payment_method = invoice.payment_method
}

Invoice.getInvoiceByOrderId = (orderId, result) => {
    let invoice = {}
    const query_order = 'SELECT o.id, o.date, o.address, o.phone, o.payment_method, u.firstname, u.lastname  FROM `order` as o JOIN `user` as u ON o.userId = u.id  WHERE o.id = ?'
    const query_orderDetail = 'SELECT * FROM `order_detail` as o JOIN `product` as p ON o.productId = p.id WHERE orderId = ?'
    db.query(query_order, orderId, (err, res) => {
        if(err) {
            console.log(err)
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            invoice.order = {
                id: res[0].id,
                name: res[0].lastname + ' ' + res[0].firstname,
                phone: res[0].phone,
                address: res[0].address,
                date: res[0].date,
                payment_method: res[0].payment_method
            }
            db.query(query_orderDetail, orderId, (err, res) => {
                if(err) {
                    console.log(err)
                    result({error: "Lỗi khi truy vấn dữ liệu"})
                } else {
                    let orderDetails = []
                    res.forEach(o => {
                        orderDetails.push({
                            name: o.name,
                            image: o.image,
                            price: o.price_product,
                            quantity: o.quantity_order
                        })
                    })
                    invoice.order_details = orderDetails
                    result(invoice)
                }
            })
        }
    })
}

Invoice.getInvoiceList = (userId, result) => {
    let query = ''
    if(userId != 0) {
        query = 'SELECT * FROM `order` WHERE userId = ? ORDER BY id DESC'
    } else {
        query = 'SELECT * FROM `order` ORDER BY id DESC'
    }
    db.query(query, userId, (err, res) => {
        if(err) {
            console.log(err)
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            result(res)
        }
    })
}

Invoice.getStatis = (queryParams, result) => {
    let from = queryParams.from
    let to = queryParams.to
    let query = 'SELECT d.productId, SUM(d.quantity_order) as quantity FROM `order` as o JOIN `order_detail` as d ON o.id = d.orderId WHERE o.date >= ? AND o.date <= ? GROUP BY d.productId ORDER BY d.productId'
    db.query(query, [from, to],(err, res) => {
        if(err) {
            console.log(err)
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            result(res)
        }
    })
}

module.exports = Invoice