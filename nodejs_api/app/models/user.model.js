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

User.getUsers= (role, result) => {
    let query = 'SELECT * FROM user'
    if(role) {
        query += ` WHERE role = '${role}'`
    }
    db.query(query , (err, res) => {
        if(err) {
            result({error: "Lỗi khi truy vấn dữ liệu!"})
        } else {
            result(res)
        }
    })
}

User.getById= (id, result) => {
    let query = 'SELECT * FROM user WHERE id=?'
    db.query(query, id, (err, res) => {
        if(err) {
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            if(res[0]) {
                result(res[0])
            } else {
                result({error: "Không tìm thấy dữ liệu"})
            }
        }
    })
}

User.create= (data, result) => {
    db.query("INSERT INTO user SET ?", data, (err, res) => {
        if(err) {
            result({error: "Xảy ra lỗi khi đăng ký tài khoản!"})
        } else {
            result({id: res.insertId, ...data, message: "Đăng ký thành công!"})
        }
    })
}

User.update = (id, data,result) => {
    let query = `UPDATE user SET firstname=?, lastname=?, phone=?, address=?, email=?, password=?, role=?  WHERE id=?`
    db.query(query, [data.firstname, data.lastname, data.phone, data.address, data.email, data.password, data.role, id],
        (err, res) => {
            if(err) {
                result({error: "Lỗi khi cập nhật dữ liệu"}) 
            } else {
                result({message: "Thay đổi thông tin thành công"})
            }
    })
}

User.delete = (id, result) => {
    db.query(`DELETE FROM user WHERE id = ${id}` , (err, res) => {
        if(err) {
            result({error: "Lỗi khi xóa dữ liệu"})  
        } else {
            result({message: "Xóa user có id " + id + " thành công"})
        }
    })
}

User.check_login = (data, result) => {
    var {email, password} = data
    var query = 'SELECT * FROM user WHERE email=?'
    db.query(query, email,(err, res) => {
        if(err || res.length === 0) {
            result({error: "Email hoặc Password sai!"}) 
        } else {
            bcrypt.compare(password, res[0].password, function(err, response) {
                if(response) {
                    result(res[0])
                } else {
                    result({error: "Email hoặc Password sai!"}) 
                }
            });
        }
    })
}

User.changePassword = (id, data, result) => {
    var {oldPass, newPass} = data
    db.query('SELECT password FROM user WHERE id =?', id, (err, res) => {
        if(err || res.length === 0) {
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            bcrypt.compare(oldPass, res[0].password, (err, response) => {
                if(err) {
                    console.log("bcrypt:", err)
                    result({error: "Lỗi khi so sánh dữ liệu"})
                } else {
                    if(response) {
                        db.query('UPDATE user SET password = ? WHERE id = ?', [newPass, id], (err, res) => {
                            if(err) {
                                result({error: "Lỗi khi cập nhật dữ liệu"})
                            } else {
                                result({message: "Đổi mật khẩu thành công", newPass})
                            }
                        })
                    } else {
                        result({error: "Mật khẩu cũ không đúng!"})
                    }
                }
            })
        }
    })
}


module.exports = User