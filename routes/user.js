var express = require('express')
var User = require('../modules/user.js')
var router = express.Router();

router.get('/register', function (req, res, next) {
    res.render('register .html');
});

router.post('/register', function (req, res, next) {
    //判断用户是否已存在
    //如果已存在，不允许注册
    //如果不存在，
    var body = req.body;
    console.log(body);
    User.findOne(
        {
            $or: [{
                email: body.email,
                name: body.name
            }]
        }
        , function (err, data) {
            if (err) {
                return next(err)
            }
            if (data) {
                return res.status(200).json({
                    err_code: 1,
                    message: "邮箱或昵称已存在"
                })
            }
            new User(body).save(function (err, user, next) {
                if (err) {
                    return next(err)
                }
                req.session.user = user  //当注册成功就记录登录成功
                return res.status(200).json({
                    err_code: 0,
                    message: "ok"
                })
            });
        }
    )
});

router.get('/login', function (req, res, next) {
    res.render('login.html');
});

router.post('/login', function (req, res, next) {
    //判断用户是否已存在
    //如果已存在，登录，保存session
    //如果不存在，提示用户名或密码不正确
    var body = req.body;
    User.findOne({
        email: body.email,
        password: body.password
    }, function (err, user) {
        if (err) {
            res.status(500).json({
                err_code: 500,
                message: "服务器错误"
            });
            return;
        }
        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: "密码或邮箱错误"
            })
        }
        req.session.user = user;
        res.render('index.html',{ loginRegister: req.session.user });
    })
});

module.exports = router;