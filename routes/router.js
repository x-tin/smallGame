var express = require('express')
var router = express.Router();

//当服务器接收到get请求 / 的时候，执行回调处理函数

router.get('/', function (req, res, next) {
    // console.log(req.session.user); //查看登录状态
    res.render('index.html');
});

router.get('/airplane', function (req, res) {
    if (req.session.user) {
        res.render('airplane.html')
    } else {
        res.render('need.html');
    }
});



router.get('/need', function (req, res) {
    res.redirect('/')
});



module.exports = router;