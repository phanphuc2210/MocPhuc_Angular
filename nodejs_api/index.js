const express = require('express')
var cors = require('cors')
const app = express()
const imgur = require('imgur')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const nodemailer =  require('nodemailer');

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

// Send mail
app.post('/send-mail', (req, res) => {
    const transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'mocphuc2210@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'oikfxuwevzikbdnc' //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    let content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                <span style="color: black">Đây là mail test</span>
                <img src="https://c4.wallpaperflare.com/wallpaper/892/692/922/howl-s-moving-castle-studio-ghibli-fantasy-art-clouds-daylight-hd-wallpaper-preview.jpg"/>
            </div>
        </div>
    `;
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'MocPhuc',
        to: req.body.mail,
        subject: 'Cảm ơn bạn đã đặt hàng trên MộcPhúc.',
        text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.send('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
        } else {
            console.log('Message sent: ' +  info.response);
            res.send('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
        }
    });
})

app.listen(8000, () => {
    console.log("Server listening on http://localhost:8000")
})