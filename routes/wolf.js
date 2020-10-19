var express = require('express')

var ScoreDb = require('../modules/score.js')
var router = express.Router();

router.get('/', function (req, res) {
    let user = req.session.user
    if (req.session.user) {
        ScoreDb.find({"username" : user._id},function (err,ret) {
            if (err){
                console.log(err);
            }else{
                res.render('wolf.html',{'ret': ret})
            }
        })
    } else {
        res.render('login.html',{warn: "warning : please login"});
    }
});

router.post("/save_score",function (req,res) {
    let user = req.session.user;
    let scoreInfo = new ScoreDb({
        "username": user._id,
        "score": req.body.score
    });
    scoreInfo.save(function (err,ret) {
        if(err){
            console.log(err);
        }else{
            console.log("分数保存成功");
        }
    })
});

module.exports = router;