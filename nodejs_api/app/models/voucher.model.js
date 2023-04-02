const db = require('../db/connect');

const Voucher = (voucher) => {
    this.code = voucher.code;
    this.discount = voucher.discount;
    this.release_date = voucher.release_date;
    this.expiration_date = voucher.expiration_date;
    this.applicable_productType = voucher.applicable_productType;
    this.bill_from = voucher.bill_from;
    this.quantity = voucher.quantity;
};

Voucher.getAll = (isCustomer,result) => {
    let condition = ''
    let currentDate = getCurrentDate()
    if(isCustomer) {
        condition = `WHERE v.release_date <= '${currentDate}' AND v.expiration_date >= '${currentDate}'`
    }
    let query = 'SELECT v.id,v.code,v.discount,v.release_date,v.expiration_date,t.name AS applicable_productTypeName,v.bill_from,v.quantity'+
        ' FROM voucher AS v JOIN type AS t ON v.applicable_productType = t.id '+ condition +' ORDER BY v.release_date DESC';
    db.query(query ,(err, res) => {
        if (err) {
            result({ error: 'Lỗi khi truy vấn dữ liệu' });
        } else {
            result(res);
        }
    });
};

Voucher.getAllByUser = (userId, result) => {
    let query = 'SELECT v.id,v.code,v.discount,v.release_date,v.expiration_date,t.name AS applicable_productTypeName,v.bill_from,v.quantity'+
    ' FROM voucher AS v JOIN type AS t ON v.applicable_productType = t.id JOIN voucher_repo as r ON v.id = r.voucherId'+
    ' WHERE r.userId = ? ORDER BY v.release_date DESC';

    db.query(query, userId, (err, res) => {
        if (err) {
            result({ error: 'Lỗi khi truy vấn dữ liệu' });
        } else {
            result(res);
        }
    })
}

Voucher.getById = (id, result) => {
    let query = 'SELECT * FROM voucher WHERE id = ?;';
    db.query(query, id, (err, res) => {
        if (err) {
            result({ error: 'Lỗi khi truy vấn dữ liệu' });
        } else {
            if (res.length > 0) {
                result(res[0]);
            } else {
                result({ error: 'Không tìm thấy dữ liệu' });
            }
        }
    });
};

Voucher.create = (data, result) => {
    let query =
        'INSERT INTO `voucher` (`id`,`code`, `discount`, `release_date`, `expiration_date`, `applicable_productType`, `bill_from`, `quantity`) VALUES (NULL,?, ?, ?, ?, ?, ?, ?)';
    db.query(
        query,
        [
            data.code,
            data.discount,
            data.release_date,
            data.expiration_date,
            data.applicable_productType,
            data.bill_from,
            data.quantity,
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

Voucher.saveVoucher = (data, result) => {
    let query = 'INSERT INTO `voucher_repo` (`userId`, `voucherId`) VALUES (?,?)';
    db.query(query, [data.userId, data.voucherId], (err, res) => {
        if (err) {
            result({ error: 'Lỗi khi thêm mới dữ liệu' });
        } else {
            result({...data });
        }
    })
}

Voucher.update = (id, data, result) => {
    let query = `UPDATE voucher SET discount=?, release_date=?, expiration_date=?, applicable_productType=?, bill_from=?, quantity=?  WHERE id=?`;
    db.query(
        query,
        [
            data.discount,
            data.release_date,
            data.expiration_date,
            data.applicable_productType,
            data.bill_from,
            data.quantity,
            id,
        ],
        (err, res) => {
            if (err) {
                result({ error: 'Lỗi khi cập nhật dữ liệu' });
            } else {
                result({ message: 'Cập nhật loại gỗ thành công' });
            }
        }
    );
};

function getCurrentDate() {
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();

    var date = year + "-" + month + "-" + day;
    return date
}

module.exports = Voucher;
