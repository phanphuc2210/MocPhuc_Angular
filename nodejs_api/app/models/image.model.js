const db = require('../db/connect')

const Image = (image) => {
    this.id = image.id
    this.productId = image.productId
    this.url = image.url
}


Image.getByProductId = (productId, result) => {
    let query = 'SELECT * FROM image WHERE productId = ?;'
    db.query(query, productId, (err, res) => {
        if(err) {
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            if(res.length > 0) {
                result(res)
            } else {
                result({error: "Không tìm thấy dữ liệu"})
            }
        }
    })
}

Image.create= (data, result) => {
    db.query("INSERT INTO product SET ?", data, (err, res) => {
        if(err) {
            result({error: "Lỗi khi thêm mới dữ liệu"})
        } else {
            result({id: res.insertId, ...data})
        }
    })
}

Image.update = (id, data, result) => {
    let query = `UPDATE product SET name=?,typeId=?, quantity=?, image=?, price=?, description=?  WHERE id=?`
    db.query(query, [data.name, data.typeId, data.quantity, data.image, data.price, data.description, id],
        (err, res) => {
            if(err) {
                result({error: "Lỗi khi cập nhật dữ liệu"})
            } else {
                result({id, product: data})
            }
    })
}

Image.delete = (id, result) => {
    db.query('SELECT * FROM `order_detail` WHERE productId = ?', id, (err, res) => {
        if(err) {
            result({error: err.message})
        } else {
            if(res.length > 0) {
                result({error: 'Không thể xóa vì sản phẩm có mã #'+ id +' đã tồn tại trong hóa đơn'})
            } else {
                db.query(`DELETE FROM product WHERE id = ${id}` , (err, res) => {
                    if(err) {
                        result({error: "Lỗi khi xóa dữ liệu"})
                    } else {
                        result({id, message: "Xóa thành công"})
                    }
                })
            }
        }
    })
}


module.exports = Image