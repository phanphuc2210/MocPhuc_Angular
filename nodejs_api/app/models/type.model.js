const db = require('../db/connect');
const slug = require('slug');

const Type = (type) => {
    this.id = type.id;
    this.name = type.name;
    this.slug = type.slug;
    this.active = type.active;
    this.description = type.description;
};

Type.getAll = (queryParams,result) => {
    let condition = ''
    if(queryParams.slug) {
        condition += ` WHERE slug = '${queryParams.slug}'`
    }
    let query = 'SELECT * FROM type' + condition
    db.query(query, (err, res) => {
        if (err) {
            result({ error: 'Lỗi khi truy vấn dữ liệu' });
        } else {
            result(res);
        }
    });
};

Type.getById= (id, result) => {
    let query = 'SELECT * FROM type WHERE id = ?;'
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

Type.getParent = (result) => {
    db.query('SELECT * FROM type WHERE parentId = 0', (err, res) => {
        if (err) {
            result({ error: 'Lỗi khi truy vấn dữ liệu' });
        } else {
            result(res);
        }
    });
};

Type.create = (data, result) => {
    let query =
        'INSERT INTO `type` (`id`, `name`, `parentId`, `description`, `slug`, `active`) VALUES (NULL, ?, ?, ?, ?, ?)';
    db.query(
        query,
        [
            data.name,
            data.parentId,
            data.description,
            slug(data.name),
            data.active,
        ],
        (err, res) => {
            if (err) {
                result({ error: 'Lỗi khi thêm mới dữ liệu' });
            } else {
                result({ id: res.insertId, ...data });
            }
        }
    );
};

Type.update = (id, data, result) => {
    let query = `UPDATE type SET name=?, description=?, parentId=?, slug=?, active=?  WHERE id=?`
    db.query(query, [data.name, data.description, data.parentId, slug(data.name), data.active, id],
        (err, res) => {
            if(err) {
                result({error: "Lỗi khi cập nhật dữ liệu"})
            } else {
                if(data.parentId !== 0) {
                    db.query('UPDATE type SET parentId = 0 WHERE parentId=?', id, (err, res) => {
                        if(err) {
                            console.log(err)
                            result({error: "Lỗi khi cập nhật dữ liệu"})
                        } else {
                            result({message: "Cập nhật loại sản phẩm thành công"})
                        }
                    })
                } else {
                    result({message: "Cập nhật loại sản phẩm thành công"})
                }
            }
        }
    )
}

Type.delete = (id, result) => {
    db.query('DELETE FROM type WHERE id = ?', id, (err, res) => {
        if(err) {
            result({error: "Lỗi khi xóa dữ liệu"})
        } else {
            result({message: "Xóa loại sản phẩm thành công"})
        }
    })
}

module.exports = Type;
