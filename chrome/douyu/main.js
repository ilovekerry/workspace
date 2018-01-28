
//斗鱼弹幕助手代码
    console.log("start");
    //注入html
    $("#js-send-msg").after("    <div class=\"speaker\" id=\"dialog\">\n" +
        "        <div class=\"main\">\n" +
        "            <a class=\"closespeaker\" id=\"closespeaker\" href=\"javascript:;\">×</a>\n" +
        "            <div class=\"broadcast-title\" id=\"move_part\">\n" +
        "                <h4>\n" +
        "                <i class=\"icon-broadcast\"></i>\n" +
        "                <span class=\"title-main\">斗鱼弹幕脚本</span>\n" +
        "                </h4>\n" +
        "            </div>\n" +
        "            <div class=\"broadcast-main\">\n" +
        "                <div class=\"broadcast-text\">\n" +
        "                    <textarea id=\"text1\" placeholder=\"请输入第一条弹幕\"></textarea>\n" +
        "                </div>\n" +
        "                <div class=\"broadcast-text\">\n" +
        "                    <textarea id=\"text2\" placeholder=\"请输入第二条弹幕\"></textarea>\n" +
        "                </div>\n" +
        "                <div class=\"broadcast-tool-bar\">\n" +
        "                    <span class=\"speaker-time\">\n" +
        "                        <label>请输入间隔时间(秒):<input type=\"text\" id=\"time\"></label>\n" +
        "                    </span>\n" +
        "                    <a class=\"btn-send\" id=\"send\" href=\"javascript:;\">开始</a>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>");
    //
    //
    // 拖动模块
    //
    //声明需要用到的变量
    var mx = 0,my = 0;      //鼠标x、y轴坐标（相对于left，top）
    var dx = 0,dy = 0;      //对话框坐标（同上）
    var isDraging = false;      //不可拖动
    var $dialog = $("#dialog");

    //鼠标按下
    $("#move_part").mousedown(function(e){
        e = e || window.event;
        if (e.preventDefault) {    //阻止浏览器默认事件
            e.preventDefault();
        }else {
            e.returnValue = false;
        }
        mx = e.pageX;     //点击时鼠标X坐标
        my = e.pageY;     //点击时鼠标Y坐标
        dx = $dialog.offset().left;
        dy = $dialog.offset().top;
        isDraging = true;      //标记对话框可拖动
    });

    //鼠标移动更新窗口位置
    $(document).mousemove(function(e){
        var e = e || window.event;
        var x = e.pageX;      //移动时鼠标X坐标
        var y = e.pageY;      //移动时鼠标Y坐标
        if(isDraging){        //判断对话框能否拖动
            var moveX = dx + x - mx;      //移动后对话框新的left值
            var moveY = dy + y - my;      //移动后对话框新的top值
            //设置拖动范围
            var pageW = $(window).width();
            var pageH = $(window).height();
            var dialogW = $dialog.width();
            var dialogH = $dialog.height();
            var maxX = pageW - dialogW;       //X轴可拖动最大值
            var maxY = pageH - dialogH;       //Y轴可拖动最大值
            moveX = Math.min(Math.max(0,moveX),maxX);     //X轴可拖动范围
            moveY = Math.min(Math.max(0,moveY),maxY);     //Y轴可拖动范围
            //重新设置对话框的left、top
            $dialog.css({"left":moveX + 'px',"top":moveY + 'px'});
        };
    });

    //鼠标离开
    $("#move_part").mouseup(function(){
        isDraging = false;
    });


    //
    //
    // 弹幕发送模块
    //
    //点击关闭按钮
    $("#closespeaker").click(function(){
        $("#dialog").css("display","none");
        if(interval){
            clearInterval(interval);
        }
    })
    //点击开始按钮
    $("#send").click(function(){
        if($(this).text()=="开始"){
            $(this).text("暂停");
            //开始发送弹幕函数
            var time=$("#time").val()*1000;
            number = 0;
            send();
            interval=setInterval(send,time);
        }else{
            $(this).text("开始");
            //暂停发送弹幕函数
            clearInterval(interval);
        };
    });
    //开始发送
    function send(){
        number +=1;
        var text1=$("#text1").val();
        var text2=$("#text2").val();
        var text = number%2?text1:text2;
        $(".cs-textarea").val(text);
        console.log(text);
        // return;
        $(".b-btn").click();
    }
