const db = require('../db/connect')

const Comment = (comment) => {
    this.userId = comment.userId
    this.productId = comment.productId
    this.userName = comment.userName
    this.message = comment.message
    this.time = comment.time
    this.star = comment.star
}

Comment.getAll= (productId, result) => {
    db.query('SELECT c.userId, c.productId, c.message, c.time, c.star, CONCAT(u.lastname, " ",u.firstname) as username FROM comment as c JOIN user as u ON c.userId = u.id WHERE productId = ?', productId, (err, res) => {
        if(err) {
            console.log(err)
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            result(res)
        }
    })
}

Comment.getSingleComment= (userId, productId, result) => {
    db.query('SELECT * FROM comment WHERE userId = ? AND productId = ?', [userId, productId], (err, res) => {
        if(err) {
            console.log(err)
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            if(res.length > 0) {
                result(res[0])
            } else {
                result({error: "Comment không tồn tại"})
            }
        }
    })
}

Comment.create = (data, result) => {
    let query = 'INSERT INTO comment (`userId`, `productId`, `message`, `time`, `star`) VALUES (?,?,?,?,?)'
    let current = getCurrentDateTime()
    db.query(query, [data.userId, data.productId, data.message, current, data.star], (err, res) => {
        if(err) {
            console.log(err)
            result({error: "Lỗi khi thêm mới comment"})
        } else {
            result({...data, time: current})
        }
    })
}

Comment.update = (data, result) => {
    let query = "UPDATE comment SET message=?,time=?,star=? WHERE userId = ? AND productId = ?"
    let current = getCurrentDateTime()
    db.query(query, [data.message, current, data.star, data.userId, data.productId], (err, res) => {
        if(err) {
            console.log(err)
            result({error: "Lỗi khi sửa comment"})
        } else {
            result({...data, time: current})
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


module.exports = Comment