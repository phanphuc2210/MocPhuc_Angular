var Type = require('../models/type.model')

exports.list = (req, res) => {
    Type.getAll((response) => {
        res.send({result: response})
    })
}