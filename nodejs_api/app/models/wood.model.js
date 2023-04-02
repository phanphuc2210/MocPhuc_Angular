const db = require('../db/connect')

const Wood = (wood) => {
    this.id = wood.id
    this.name = wood.name
    this.image = wood.image
    this.description = wood.description
    this.detail = wood.detail
    this.advantage = wood.advantage
    this.defect = wood.defect
}

Wood.getAll= (result) => {
    db.query('SELECT * FROM wood' , (err, res) => {
        if(err) {
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            result(res)
        }
    })
}

Wood.getById= (id, result) => {
    let query = 'SELECT * FROM wood WHERE id = ?;'
    db.query(query, id, (err, res) => {
        if(err) {
            result({error: "Lỗi khi truy vấn dữ liệu"})
        } else {
            if(res.length > 0) {
                result(res[0])
            } else {
                result({error: "Không tìm thấy dữ liệu"})
            }
        }
    })
}

Wood.create= (data, result) => {
    let query = "INSERT INTO `wood` (`id`, `name`, `description`,`detail`, `image`, `advantage`, `defect`) VALUES (NULL, ?, ?, ?, ?, ?, ?)"
    db.query(query, [data.name, data.description, data.detail,data.image, data.advantage, data.defect,], (err, res) => {
        if(err) {
            result({error: "Lỗi khi thêm mới dữ liệu"})
        } else {
            result({id: res.insertId, ...data})
        }
    })
}

Wood.update = (id, data, result) => {
    let query = `UPDATE wood SET name=?, description=?, detail=?,image=?, advantage=?, defect=?  WHERE id=?`
    db.query(query, [data.name, data.description, data.detail,data.image, data.advantage, data.defect, id],
        (err, res) => {
            if(err) {
                result({error: "Lỗi khi cập nhật dữ liệu"})
            } else {
                result({message: "Cập nhật loại gỗ thành công"})
            }
        }
    )
}

module.exports = Wood