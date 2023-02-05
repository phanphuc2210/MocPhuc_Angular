const db = require('../db/connect')

const Type = (type) => {
    this.id = type.id
    this.name = type.name
}

Type.getAll= (result) => {
    db.query('SELECT * FROM type' , (err, res) => {
        if(err) {
            result(null)
            return
        }
        result(res)
    })
}


module.exports = Type