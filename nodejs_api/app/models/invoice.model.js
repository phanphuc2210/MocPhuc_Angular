const db = require('../db/connect')
const { statusCode } = require('../common/constant')

const Invoice = (invoice) => {
    this.id = invoice.id
    this.date = invoice.date
    this.address = invoice.address
    this.phone = invoice.phone
    this.payment_method = invoice.payment_method
}

Invoice.getInvoiceByOrderId = (orderId, result) => {
    let invoice = {}
    const query_order = 'SELECT o.id, o.order_date, o.address, o.phone, o.payment_method, u.firstname, u.lastname, s.name AS status_name, o.status FROM `order` as o JOIN `user` as u ON o.userId = u.id JOIN `status` as s ON o.status = s.id WHERE o.id = ?'
    const query_orderDetail = 'SELECT * FROM `order_detail` as o JOIN `product` as p ON o.productId = p.id JOIN image ON o.productId = image.productId WHERE orderId = ? GROUP by p.id'
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
                order_date: res[0].order_date,
                payment_method: res[0].payment_method,
                status: res[0].status,
                status_name: res[0].status_name
            }
            db.query(query_orderDetail, orderId, (err, res) => {
                if(err) {
                    console.log(err)
                    result({error: "Lỗi khi truy vấn dữ liệu"})
                } else {
                    let orderDetails = []
                    res.forEach(o => {
                        orderDetails.push({
                            productId: o.productId,
                            name: o.name,
                            image: o.url,
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
        query = 'SELECT o.id,o.order_date,o.address,o.phone,o.payment_method,s.name AS status_name, o.status FROM `order` AS o JOIN `status` AS s ON o.status = s.id WHERE userId = ? ORDER BY id DESC'
    } else {
        query = 'SELECT o.id,o.order_date,o.address,o.phone,o.payment_method,s.name AS status_name, o.status FROM `order` AS o JOIN `status` AS s ON o.status = s.id ORDER BY id DESC'
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

Invoice.getNextStatusByOrderId = (orderId, result) => {
    let currentStatus
    db.query('SELECT status FROM `order` WHERE id = ?', orderId, (err, res) => {
        if(err) {
            console.log(err)
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            if(res.length > 0) {
                currentStatus = res[0].status
                db.query('SELECT * FROM status WHERE id = ?', currentStatus + 1, (err, res) => {
                    if(err) {
                        console.log(err)
                        result({error: "Lỗi khi truy vấn dữ liệu"})
                    } else {
                        if(res.length > 0) {
                            result({orderId, statusId: res[0].id, nextStatus: res[0].name})
                        } else {
                            result({error: "Không tìm thấy dữ liệu"})
                        }
                    }
                })
            } else {
                result({error: "Không tìm thấy dữ liệu"})
            }
        }
    })
}

Invoice.getListStatusByOrderId = (orderId, result) => {
    let query = 'SELECT s.name AS status_name, st.date FROM status_track AS st JOIN status AS s ON st.statusId = s.id WHERE orderId = ?'
    db.query(query, orderId, (err, res) => {
        if(err) {
            console.log(err)
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            result(res)
        }
    })
}

Invoice.updateStatus = (data, result) => {
    let query_statusTrack = 'INSERT INTO `status_track` (`orderId`, `statusId`, `date`) VALUES (?,?,?)'
    db.query('UPDATE `order` SET status = ? WHERE id = ?', [data.nextStatus, data.orderId], (err, res) => {
        if(err) {
            console.log(err)
            result({error: "Lỗi khi cập nhật trạng thái mới"})
        } else {
            db.query(query_statusTrack, [data.orderId, data.nextStatus, getCurrentDateTime()], (err, res) => {
                if(err) {
                    console.log(err)
                    result({error: "Lỗi khi cập nhật status tracking"})
                } else {
                    result({message: "Cập nhật trạng thái mới thành công"})
                }
            })
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

function getCurrentDateTime() {
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hour = date_ob.getHours();
    var minute = date_ob.getMinutes();
    var second = date_ob.getSeconds();

    var datetime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return datetime
}

module.exports = Invoice