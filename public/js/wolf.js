$(function () {
    //记录分数
    let score = 0;
    //1.点击游戏规则模块显示
    $('.rules').click(function () {
        $('.rule').stop().fadeIn(100);
    });

    //2.点击关闭 游戏模块关闭
    $('.close').click(function () {
        $('.rule').stop().fadeOut(100);
    });

    //3.点击开始游戏按钮
    $('.start').click(function () {
        $(this).fadeOut(50);
        //调用进度条方法
        progress();
        //调用狼运动方法
        wolfAnimation();
    });

    $('.historyScore').hover(function () {
        $('.historyScore ul').css('display','block')
    },function () {
        $('.historyScore ul').css('display','none')
    })
    //重新开始，将分数设置为0.重新开始动画操作
    $('.reStart').click(function () {
        $('.score').text(0);
        $('.mask').fadeOut(100);
        progress();
        wolfAnimation();
        $.post({
            url: "/wolf/save_score",
            data: {
                score: score
            },
            success: function (e) {

            }
        });
    })

    //4.监听进度条
    let timer1;

    function progress() {
        $('.progress').css({width: 180});
        timer1 = setInterval(function () {
            //拿到当前进度条的宽度
            let proWidth = $('.progress').width();
            proWidth--;
            $('.progress').css({width: proWidth});
            //判断进度条是否走完,走完后清除定时器，将游戏结束页面显示
            if (proWidth <= 0) {
                clearInterval(timer1);
                clearInterval(timer2);
                $('.wolfImage').remove();
                $('.mask').fadeIn(200);
                $.post({
                    url: "/wolf/save_score",
                    data: {
                        score: score
                    },
                    success: function (e) {

                    }
                });
                score = 0;
            }
        }, 30)
    }


    //监听灰太狼运动
    let timer2;

    function wolfAnimation() {
        //存两个狼的图片路径
        let wolfH = [],
            wolfX = [];
        for (let i = 0; i <= 9; i++) {
            wolfH.push("../public/images/h" + i + ".png");
            wolfX.push("../public/images/x" + i + ".png");
        }
        //保存狼可能出现的坐标
        let arrPos = [
            {left: "100px", top: "115px"},
            {left: "20px", top: "160px"},
            {left: "190px", top: "142px"},
            {left: "105px", top: "193px"},
            {left: "19px", top: "221px"},
            {left: "202px", top: "212px"},
            {left: "120px", top: "275px"},
            {left: "30px", top: "295px"},
            {left: "209px", top: "297px"}
        ];
        //创建图片
        let img = $('<img src="" class="wolfImage">');
        //随机选择图片的位置
        let posImg = Math.round(Math.random() * 8);
        //随机选择狼的类型
        let type = Math.round(Math.random()) === 1 ? wolfH : wolfX;
        img.css({
            position: 'absolute',
            left: arrPos[posImg].left,
            top: arrPos[posImg].top
        });
        window.wolfStart = 0;
        window.wolfEnd = 5;
        timer2 = setInterval(function () {
            wolfStart++;
            if (wolfStart > wolfEnd) {
                img.remove();
                clearInterval(timer2);
                wolfAnimation();
            }
            img.attr('src', type[wolfStart - 1]);
        }, 300)
        $('.container').append(img);
        afterClick(img)
    }

    function afterClick(img) {
        $(img).one('click', function () {
            window.wolfStart = 5;
            window.wolfEnd = 9;
            let imgSrc = $(this).attr('src');
            let flag = imgSrc.indexOf('h') >= 0;
            if (flag) {
                score = score + 10;
                $('.score').text(score);
            } else {
                score = score - 10;
                $('.score').text(score);
            }
        })
    }


})


