const db = require('../db/connect')

const Type = (type) => {
    this.id = type.id
    this.name = type.name
}

Type.getAll= (result) => {
    db.query('SELECT * FROM type' , (err, res) => {
        if(err) {
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            result(res)
        }
    })
}


module.exports = Type