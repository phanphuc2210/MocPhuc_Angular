const db = require('../db/connect')

const Product = (product) => {
    this.id = product.id
    this.name = product.name
    this.typeId = product.typeId
    this.quantity = product.quantity
    this.image = product.image
    this.price = product.price
    this.description = product.description
}

Product.getAll= (queryParams, result) => {
    let filters = []
    let filter_query = ''
    let limit = ''
    if(queryParams != null) {
        if(queryParams.name) {
            filters.push(`a.name LIKE '%${queryParams.name}%'`)
        }
        if(queryParams.typeId) {
            filters.push(`a.typeId = ${queryParams.typeId}`)
        }
        if(queryParams.gte) {
            filters.push(`a.price >= ${Number(queryParams.gte)}`)
        }
        if(queryParams.lte) {
            filters.push(`a.price <= ${Number(queryParams.lte)}`)
        }
        if(queryParams.limit) {
            limit = `LIMIT ${Number(queryParams.limit)}`
        }
    }

    if(filters.length > 0) {
        filter_query = 'WHERE ' + filters.join(' AND ')
    }
    

    let query = 'SELECT a.id, a.name, a.typeId, a.quantity, a.image, a.price, a.description, b.name AS type_name FROM product AS a JOIN type AS b ON a.typeId = b.id ' + filter_query + ' ' + limit
    db.query(query , (err, res) => {
        if(err) {
            result(null)
        } else {
            result(res)
        }
    })
}

Product.getById= (id, result) => {
    let query = 'SELECT a.id, a.name, a.typeId, a.quantity, a.image, a.price, a.description, b.name AS type_name FROM product AS a JOIN type AS b ON a.typeId = b.id WHERE a.id = ?;'
    db.query(query, id, (err, res) => {
        if(err) {
            result(null)
            return
        }
        result(res)
    })
}

Product.create= (data, result) => {
    db.query("INSERT INTO product SET ?", data, (err, res) => {
        if(err) {
            result(null)
        } else {
            result({id: res.insertId, ...data})
        }
    })
}

Product.update = (id, data,result) => {
    let query = `UPDATE product SET name=?,typeId=?, quantity=?, image=?, price=?, description=?  WHERE id=?`
    db.query(query, [data.name, data.typeId, data.quantity, data.image, data.price, data.description, id],
        (err, res) => {
            console.log(err)
            if(err) {
                result(null) 
            } else {
                result({id, product: data})
            }
    })
}

Product.delete = (id, result) => {
    db.query('SELECT * FROM `order_detail` WHERE productId = ?', id, (err, res) => {
        if(err) {
            result(null) 
        } else {
            if(res.length > 0) {
                result({err: 'Không thể xóa vì sản phẩm có mã #'+ id +' đã tồn tại trong hóa đơn'})
            } else {
                db.query(`DELETE FROM product WHERE id = ${id}` , (err, res) => {
                    if(err) {
                        result(null) 
                    } else {
                        result({id})
                    }
                })
            }
        }
    })

    // db.query(`DELETE FROM product WHERE id = ${id}` , (err, res) => {
    //     if(err) {
    //         result(null) 
    //     } else {
    //         result({id})
    //     }
    // })
}


module.exports = Product