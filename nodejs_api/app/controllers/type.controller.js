var Type = require('../models/type.model')

exports.list = (req, res) => {
    Type.getAll((response) => {
        if(response.error) {
            res.status(400).send({message: response.error})
        } else {
            res.send(response)
        }
    })
}