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


function getCurrentDate() {
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();

    var date = year + "-" + month + "-" + day;
    return date
}

module.exports = Cart