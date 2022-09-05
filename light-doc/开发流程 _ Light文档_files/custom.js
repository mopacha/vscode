//此函数用于创建复制按钮
function createCopyBtns() {
    var $codeArea = $("pre");
    //查看页面是否具有代码区域，没有代码块则不创建 复制按钮
    if ($codeArea.length > 0) {
        function changeToSuccess(item) {
            $imgOK = $("#copyBtn").find("#imgSuccess");
            if ($imgOK.css("display") == "none") {
                setTimeout(function() {
                    $imgOK.css({
                        display: "block",
                        opacity: 1
                    })
                }, 200);
                setTimeout(function() {
                    $imgOK.css({
                        opacity: 0,
                        display: "none"
                    });
                }, 1000);
            };
        };
        $(".inner").before('<div id="copyBtn" style="opacity: 0; position: absolute;top:0px;left:0px;display: none; "><span id="imgCopy" ><i class="fa fa-paste fa-fw"></i></span><span id="imgSuccess" style="display: none;">copied</span>');

        var clipboard = new ClipboardJS('#copyBtn', {
            target: function() {
                //返回需要复制的元素内容
                return document.querySelector("[copyFlag]");
            },
            isSupported: function() {
                //支持复制内容
                return document.querySelector("[copyFlag]");
            }
        });

        //复制成功事件绑定
        clipboard.on('success',
            function(e) {
                //清除内容被选择状态
                e.clearSelection();
                changeToSuccess(e);
            });
        //复制失败绑定事件
        clipboard.on('error',
            function(e) {
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
            });
        //鼠标 在复制按钮上滑动和离开后渐变显示/隐藏效果
        $("#copyBtn").hover(
            function() {
                $(this).stop();
                $(this).css("opacity", 1);
            },
            function() {
                $(this).animate({
                    opacity: 0
                }, 300);
            }
        );
    }
}
//感应鼠标是否在代码区
$("pre").hover(
    function(e) {
        $(this).css('position', 'relative');
        $pre = $(this);
        //-------鼠标活动在代码块内
        //移除之前含有复制标志代码块的 copyFlag
        $("[copyFlag]").removeAttr("copyFlag");
        //在新的（当前鼠标所在代码区）代码块插入标志：copyFlag
        $(this).attr("copyFlag", 1);
        //获取复制按钮
        $copyBtn = $("#copyBtn");
        if ($copyBtn.length != 0) {
            $('#imgSuccess').css('display', 'none');
            $copyBtn.stop();
            $copyBtn.css("opacity", 0.8);
            $copyBtn.css("display", "block");
            $copyBtn.css("top", parseInt($copyBtn.css("top")) + $(this).offset().top - $copyBtn.offset().top + 5);
            $copyBtn.css("left", $pre[0].offsetLeft + $pre[0].offsetWidth - $copyBtn.width() - 5);

        }
    },
    function() {
        //-------鼠标离开代码块
        $("#copyBtn").animate({
            opacity: 0
        }, 300);
    }
);
//页面载入完成后，创建复制按钮
$(document).ready(function() {
  createCopyBtns();
});