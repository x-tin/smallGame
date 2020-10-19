const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//连接数据库
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true,useUnifiedTopology: true});

let scoreSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

let scoreDb = mongoose.model('Score', scoreSchema);
module.exports = scoreDb;