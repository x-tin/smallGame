//1.引包
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

//创建服务器相当于原来的http.createServer
var app = express();

//公开 指定目录
//这样做可以直接通过 /文件名 的方式访问到该文件下的资源（推荐使用）
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

// 设置模板的渲染函数
// 第一个参数指的是文件扩展名
// 第二个参数callback 是模板引擎的主函数，接受文件路径、参数对象和回调函数作为其参数。
app.engine('.html', require('express-art-template'))
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//配置session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use("/wolf", require('./routes/wolf'));
app.use("/user", require('./routes/user'));
app.use("/", require('./routes/router'));

//配置一个处理404的中间件,如果前面没有任何一个中间件处理，当做404
app.use(function (req, res) {
    res.render('404.html')
});

app.listen(3000, function () {
    console.log('running');
});