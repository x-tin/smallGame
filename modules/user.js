const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//连接数据库
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);
//设计表结构（文档结构）
let userSchema = new Schema({
    name: {
        type: String,
        required: true //增加约束，必须有用户名这个属性
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Number,
        required: true
    }
})

//将文档结构发布为模型
//第一个参数：传入一个大写单数的字符串用作数据库名称，mongoose会自动将该字符串生成小写复数
//第二个参数：架构schema
let User = mongoose.model('User', userSchema);
module.exports = User;
