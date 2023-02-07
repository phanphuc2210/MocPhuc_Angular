const express = require('express')
var cors = require('cors')
const app = express()
const imgur = require('imgur')
const fs = require('fs')
const fileUpload = require('express-fileupload')

app.use(cors())
app.use(fileUpload())

// Cau hinh body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


var authMiddleware = require('./app/common/authMiddleWare')
// Cac routers
var typeRouter = require('./app/routes/type.router')
var productRouter = require('./app/routes/product.router')
var cartRouter = require('./app/routes/cart.router')
var invoiceRouter = require('./app/routes/invoice.router')
var userRouter = require('./app/routes/user.router')
var authRouter = require('./app/routes/auth.router')

app.use('/auth', authRouter)
app.use('/types', typeRouter)
app.use('/products', productRouter)
app.use('/cart', authMiddleware.isAuth,cartRouter)
app.use('/invoice', authMiddleware.isAuth,invoiceRouter)
app.use('/users', authMiddleware.isAuth, userRouter)

// upload ảnh
app.post('/upload' , (req , res)=>{
    console.log(req.files.file)
    if(!req.files.file) {
        return res.status(400).send('No files were uploaded.')
    }

    let sampleFile = req.files.file 
    let uploadPath = __dirname + '/uploads/' + sampleFile.name

    sampleFile.mv(uploadPath, (err) => {
        if(err) {
            return res.status(500).send(err)
        }

        imgur.uploadFile(uploadPath).then((urlOnject) => {
            fs.unlinkSync(uploadPath)
            res.send({result: urlOnject.link})
        })
    })
})

app.listen(8000, () => {
    console.log("Server listening on http://localhost:8000")
})