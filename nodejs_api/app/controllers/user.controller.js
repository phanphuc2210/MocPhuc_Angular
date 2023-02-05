var User = require('../models/user.model')
var jwt = require('../common/_jwt')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.listCustomer = (req, res) => {
    User.getCustomer((response) => {
        res.send({result: response})
    })
}

exports.listAdmin = (req, res) => {
    User.getAdmin((response) => {
        res.send({result: response})
    })
}

exports.detail = (req, res) => {
    const id = req.params.id
    User.getById(id, (response) => {
        res.send({result: response})
    })
}

exports.add = (req, res) => {
    var data = req.body
    let encryptedPassword = ''

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(data.password, salt, function(err, hash) {
            encryptedPassword = hash
            data = {
                ...data,
                password: encryptedPassword
            }

            User.create(data, (response) => {
                res.send({result: response})
            })
        });
    });
}

exports.update = (req, res) => {
    var id = req.params.id
    var data = req.body
    User.update(id, data,(response) => {
        res.send({result: response})
    })
}

exports.remove = (req, res) => {
    var id = req.params.id
    User.delete(id, (response) => {
        res.send({result: response})
    })
}

exports.login = (req, res) => {
    var data = req.body
    User.check_login(data, async (response) => {
        if(response) {
            const payload = {id: response.id, firstname: response.firstname, role: response.role}
            const token = await jwt.make(payload)
            res.send({result: {token, data: payload, message: "Đăng nhập thành công"}})
        } else {
            res.status(400).send({message: "Email hoặc Password sai!"})
        }
    })
}
