const db = require('../db/connect')
const nodemailer =  require('nodemailer');
const { format } = require('../db/connect');

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

Cart.sendMail = (data, result) => {
    const order = data.order
    const orderDetails = data.order_details
    const transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'mocphuc2210@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'oikfxuwevzikbdnc' //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    let rowProduct = ''
    let total_price = 0
    orderDetails.forEach(d => {
        total_price += d.price * d.quantity
        rowProduct += `
            <tr style="background-color:white;border-bottom-width: 1px;color: rgb(17,24,39)">
                <th scope="row" style="padding: 16px 24px">
                    <img style="width:64px; margin: 0 auto" class="w-16 mx-auto" src="${d.image}">
                </th>
                <td style="padding: 16px 24px">
                    ${d.name}
                </td>
                <td style="padding: 16px 24px">
                    ${new Intl.NumberFormat('it-IT', {style : 'currency', currency : 'vnd'}).format(d.price)}
                </td>
                <td style="padding: 16px 24px">
                    ${d.quantity}
                </td>
                <td style="padding: 16px 24px">
                    ${new Intl.NumberFormat('it-IT', {style : 'currency', currency : 'vnd'}).format(d.price * d.quantity) }
                </td>
            </tr>
        `
    })
    let content = `
            <h1>MộcPhúc.</h1>
            <div style="margin-top: 12px; background-color: white">
                <h2 style="margin-bottom: 8px;">Chi tiết hóa đơn #${order.id}</h2>
                <hr>
                <div style="display: flex;">
                    <div>
                        <p style="margin: 12px 0;font-weight: 700;">Tên khách hàng: <span style="font-weight: 400;">${order.name}</span></p>
                        <p style="margin: 12px 0;font-weight: 700;">Số điện thoại: <span style="font-weight: 400;">${order.phone}</span></p>
                        <p style="margin: 12px 0;font-weight: 700;">Nơi nhận: <span style="font-weight: 400;">${order.address}</span></p>
                    </div>
                    <div style="margin-left: 28px">
                        <p style="margin: 12px 0;font-weight: 700;">Ngày đặt hàng: <span style="font-weight: 400;">${getCurrentDate()}</span></p>
                        <p style="margin: 12px 0;font-weight: 700;">Phương thức thanh toán: <span style="font-weight: 400;">${order.payment_method}</span></p>
                    </div>
                </div>
    
                <table style="width: 100%; text-align: center; color: rgb(107,114,128); margin-top: 20px">
                    <thead style="color: rgb(55,65,81);background-color: rgb(249,250,251)">
                        <tr>
                            <th scope="col" style="padding: 12px 24px;">
                                Hình ảnh
                            </th>
                            <th scope="col" style="padding: 12px 24px;">
                                Tên sản phẩm
                            </th>
                            <th scope="col" style="padding: 12px 24px;">
                                Đơn giá
                            </th>
                            <th scope="col" style="padding: 12px 24px;">
                                Số lượng
                            </th>
                            <th scope="col" style="padding: 12px 24px;">
                                Thành tiền
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowProduct}
                    </tbody>
                </table>
                <h3 style="color:#000; margin-top:24px; text-align: right;">Tổng tiền: <span style="color: rgb(224,36,36);">${new Intl.NumberFormat('it-IT', {style : 'currency', currency : 'vnd'}).format(total_price)}</span></h3>
            </div>
    `;
    
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'MocPhuc',
        to: order.email,
        subject: 'Cảm ơn bạn đã đặt hàng trên MộcPhúc.',
        text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            result({mess: 'Lỗi gửi mail: '+err}) //Gửi thông báo đến người dùng
        } else {
            console.log('Message sent: ' +  info.response);
            result({mess: 'Một email đã được gửi đến tài khoản của bạn'}) //Gửi thông báo đến người dùng
        }
    });
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