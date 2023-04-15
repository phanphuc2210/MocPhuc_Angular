const moment = require('moment');

exports.vnpayPayment = (req, res, next) => {
    // const data = req.body

    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var tmnCode = "WK5H83B0";
    var secretKey = "VFARAVRGWHBMORZJGMNTWBWJHXCQDIVR";
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = "http://localhost:4200/success";

    var date = new Date();
    
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let orderId = moment(date).format('MMDDHHmmss');
    var amount = 30000;
    var bankCode = "NCB";

    var orderInfo = "Thanh toán đơn hàng test";
    var orderType = "billpayment";
    var locale = "vn";
    
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false }); 
    let crypto = require("crypto");    
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    // res.redirect(vnpUrl)
    res.send({url: vnpUrl})
}

exports.vnpayReturn = (req, res, next) => {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = "WK5H83B0";
    let secretKey = "VFARAVRGWHBMORZJGMNTWBWJHXCQDIVR";

    let signData = querystring.stringify(vnp_Params, { encode: false });   
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.send({code: vnp_Params['vnp_ResponseCode']})
    } else{
        res.send({code: '97'})
    }
}

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
