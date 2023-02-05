const db = require('../db/connect')

const Cart = (cart) => {
    this.id = cart.id
    this.userId = cart.userId
    this.productId = cart.product
}

Cart.getCartByUserId= (id, result) => {
    let query = 'SELECT p.id, p.name, p.typeId, p.quantity, p.image, p.price, p.description FROM cart JOIN product as p ON cart.productId = p.id WHERE userId = ?;'
    db.query(query, id, (err, res) => {
        if(err) {
            console.log(err)
            result(null)
            return
        }
        result(res)
    })
}

Cart.create= (data, result) => {
    db.query("INSERT INTO cart SET ?", data, (err, res) => {
        if(err) {
            result(null)
        } else {
            result({id: res.insertId, ...data})
        }
    })
}

Cart.decrease = (userId, productId, result) => {
    let query = 'DELETE FROM cart WHERE userId=? AND productId=? LIMIT 1';
    db.query(query, [userId, productId], (err, res) => {
        if(err) {
            result(null) 
        } else {
            result({userId, productId})
        }
    })
}

Cart.remove = (userId, productId, result) => {
    let query = 'DELETE FROM cart WHERE userId=? AND productId=?';
    db.query(query, [userId, productId], (err, res) => {
        if(err) {
            result(null) 
        } else {
            result({userId, productId})
        }
    })
}

Cart.clear = (userId, result) => {
    let query = 'DELETE FROM cart WHERE userId=?';
    db.query(query, userId, (err, res) => {
        if(err) {
            result(null) 
        } else {
            result({userId})
        }
    })
}

Cart.payment = (data, result) => {
    const order = data.order
    const orderDetails = data.order_details
    let query_order = 'INSERT INTO `order` (`userId`, `date`, `address`, `phone`, `payment_method`) VALUES (?,?,?,?,?)'
    let query_orderDetail = 'INSERT INTO `order_detail` (`orderId`, `productId`, `quantity_order`) VALUES (?,?,?)'
    db.query(query_order, [order.userId, getCurrentDate(), order.address, order.phone, order.payment_method] , (err, res) => {
        if(err) {
            console.log(err)
            result(null)
        } else {
            const orderID = res.insertId
            console.log('orderID:', orderID)
            orderDetails.forEach(o => {
                db.query(query_orderDetail, [orderID, o.productId, o.quantity], () => {
                    db.query('UPDATE product SET quantity = quantity - ? WHERE id = ?', [o.quantity, o.productId])
                })
            });
            result({orderId: orderID})
        }
    })    
}

Cart.getInvoiceByOrderId = (orderId, result) => {
    let invoice = {}
    const query_order = 'SELECT o.id, o.date, o.address, o.phone, o.payment_method, u.firstname, u.lastname  FROM `order` as o JOIN `user` as u ON o.userId = u.id  WHERE o.id = ?'
    const query_orderDetail = 'SELECT * FROM `order_detail` as o JOIN `product` as p ON o.productId = p.id WHERE orderId = ?'
    db.query(query_order, orderId, (err, res) => {
        if(err) {
            console.log(err)
            result(null)
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
                    result(null)
                } else {
                    let orderDetails = []
                    res.forEach(o => {
                        orderDetails.push({
                            name: o.name,
                            image: o.image,
                            price: o.price,
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

Cart.getInvoiceList = (userId, result) => {
    let query = ''
    if(userId != 0) {
        query = 'SELECT * FROM `order` WHERE userId = ? ORDER BY id DESC'
    } else {
        query = 'SELECT * FROM `order` ORDER BY id DESC'
    }
    db.query(query, userId, (err, res) => {
        if(err) {
            console.log(err)
            result(null)
        } else {
            result(res)
        }
    })
}

Cart.getStatis = (queryParams, result) => {
    let from = queryParams.from
    let to = queryParams.to
    let query = 'SELECT d.productId, SUM(d.quantity_order) as quantity FROM `order` as o JOIN `order_detail` as d ON o.id = d.orderId WHERE o.date >= ? AND o.date <= ? GROUP BY d.productId ORDER BY d.productId'
    db.query(query, [from, to],(err, res) => {
        if(err) {
            console.log(err)
            result(null)
        } else {
            result(res)
        }
    })
}

function getCurrentDate() {
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();

    var date = year + "-" + month + "-" + day;
    return date
}

module.exports = Cart