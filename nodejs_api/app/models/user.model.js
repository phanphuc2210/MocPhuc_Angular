const db = require('../db/connect')
const bcrypt = require('bcrypt');

const User = (user) => {
    this.id = user.id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.phone = user.phone
    this.address = user.address
    this.email = user.email
    this.password = user.password
    this.role = user.role
}

User.getCustomer= (result) => {
    db.query('SELECT * FROM user WHERE role = "Customer"' , (err, res) => {
        if(err) {
            result(null)
            return
        }
        result(res)
    })
}

User.getAdmin = (result) => {
    db.query('SELECT * FROM user WHERE role = "Admin"' , (err, res) => {
        if(err) {
            result(null)
            return
        }
        result(res)
    })
}

User.getById= (id, result) => {
    let query = 'SELECT * FROM user WHERE id=?'
    db.query(query, id, (err, res) => {
        if(err) {
            result(null)
            return
        }
        result(res)
    })
}

User.create= (data, result) => {
    db.query("INSERT INTO user SET ?", data, (err, res) => {
        if(err) {
            result(null)
        } else {
            result({id: res.insertId, ...data})
        }
    })
}

User.update = (id, data,result) => {
    let query = `UPDATE user SET firstname=?, lastname=?, phone=?, address=?, email=?, password=?, role=?  WHERE id=?`
    db.query(query, [data.firstname, data.lastname, data.phone, data.address, data.email, data.password, data.role, id],
        (err, res) => {
            if(err) {
                result(null) 
            } else {
                result({mesage: "Cập nhật dữ liệu có id " + id + " thành công"})
            }
    })
}

User.delete = (id, result) => {
    db.query(`DELETE FROM user WHERE id = ${id}` , (err, res) => {
        if(err) {
            result(null) 
        } else {
            result({mesage: "Xóa dữ liệu có id " + id + " thành công"})
        }
    })
}

User.check_login = (data, result) => {
    var {email, password} = data
    var query = 'SELECT * FROM user WHERE email=?'
    db.query(query, email,(err, res) => {
        if(err || res.length === 0) {
            result(null) 
        } else {
            bcrypt.compare(password, res[0].password, function(err, response) {
                if(response) {
                    result(res[0])
                } else {
                    result(null)
                }
            });
        }
    })
}


module.exports = User