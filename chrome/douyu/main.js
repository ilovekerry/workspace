
//斗鱼弹幕助手代码
$(document).ready(function(){
    var x;
    $("#js-send-msg").append("<textarea></textarea><button>开始</button><input type='number'>");
    $("#js-send-msg textarea").css("float","left");
    function sea(){
        console.log(x);
        if(isNaN(x)){
            x=1;
        }
        else{
            x+=1;
        };
        var y=$("#js-send-msg textarea").last().val();

        $(".cs-textarea").val(x+y);
        $(".b-btn").click();
    }

    var b=1;
    $("#js-send-msg button").last().click(function(){
        var z=$("#js-send-msg input").last().val();
        if(isNaN(z)||z==0){
            z=6000;
        }
        else{
            z=z*1000
        };
        if(b==1){
            time=setInterval(sea,z);
            b=2;
            $("#js-send-msg button").text("暂停")
        }
        else{
            clearInterval(time),function(){
                time=setInterval(sea,z);
            };
            b=1;
            $("#js-send-msg button").text("开始")
        };
    });
});