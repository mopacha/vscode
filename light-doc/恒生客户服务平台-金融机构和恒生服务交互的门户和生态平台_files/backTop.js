

function ubasClick(ubasBaseInfo,ubasId){
    if($("#service_name").text()){
        ubasBaseInfo.c_prodname = $("service_name_ubas").html();
    }
    ubasBaseInfo.c_pagetitle = $("title").html();
    Countly.q.push(['customEvent', {
        eventId:'vid_nav_' + ubasId,
        other: ubasBaseInfo
    }]);
    var trackObj={
        '19':'咨询电话',
        '20':'在线客服',
        '21':'提交工单'
    }
    window._hmt && window._hmt.push(['_trackEvent', '公共导航', '点击',trackObj[ubasId]]);

    ubasId=='21'&& gdp('track','OP_issueTicketSubmit',{pageName_var: document.title, hsUserId_var: ubasBaseInfo.c_hsid || '-'})
    ubasId=='19'&& gdp('track','OP_onlineServiceClick',{pageName_var: document.title, hsUserId_var: ubasBaseInfo.c_hsid || '-'})

}

/*打开网易七鱼*/
function openYsf(){
    //ubasClick(ubasBaseInfo,20);
    ysf.open();
}
function getTrack(eId){
    //ubasClick(ubasBaseInfo,eId);
}

/*回到顶部的功能*/
function backTop(){
    //var oTop = document.getElementById("to_top");
    //var screenh = document.documentElement.clientHeight || document.body.clientHeight;
    //oTop.style.top = screenh - oTop.offsetHeight + "px";
//          window.onscroll = function(){
//            var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
//            oTop.style.top = screenh - oTop.offsetHeight + scrolltop +"px";
//          }
    //oTop.onclick = function(){
    document.documentElement.scrollTop = document.body.scrollTop =0;
    // }
}
//backTop();

function showBackTop(){
    window.onscroll = function(){
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrolltop >document.documentElement.clientHeight){
            $("#to_top").show();
        }else{
            $("#to_top").hide();
        }
    }
}
showBackTop();

/*意见反馈弹框*/
function openPop(){
    //change();
    //ubasClick(ubasBaseInfo,21);
    $("body").css("overflow","hidden");
    $('#sjSubmitPhone,#sjSubmitCode,#sjSubmitDes,#sjSubmitName,#sjSubmitTel,#sjSubmitContact').val('');
    $("#sjSubmitModal,.black_overlay").fadeIn();
    if(logOut==true){
        $("#sjPhoneItem,#sjCodeItem").show();
    }else{
        $("#sjPhoneItem,#sjCodeItem").hide();
    }
    //window.location.href = "/cloud/open/feedback/createWorkOrder.html";
}


// /*关闭弹框*/
// function closePop(){
//     $("body").css("overflow","auto");
//     $("#sjSubmitModal .modal-text-placeholder").show();
//     $("#sjSubmitModal input,#sjSubmitModal textarea").css("border","1px solid #bbbbbb");
//     $("#sjSubmitModal,.black_overlay").fadeOut(300);
//     $('#sjSubmitModal .modal-input-error').hide();
//     $('#sjSubmitPhone,#sjSubmitCode,#sjSubmitDes,#sjSubmitName,#sjSubmitTel,#sjSubmitContact').val('');
// }

/*关闭提交确认弹窗*/
function closeConfirmPop(){
    $("body").css("overflow","auto");
    closePop();
    //$("body").css("overflow","auto");
    //$("#sjSubmitModal input,#sjSubmitModal textarea").css("border","1px solid #bbbbbb");
    $("#sjSubmitSuccess,.black_overlay").fadeOut(300);
    //$('#sjSubmitModal,#sjSubmitSuccess').hide();
    //$('#sjSubmitPhone,#sjSubmitCode,#sjSubmitDes,#sjSubmitName,#sjSubmitTel,#sjSubmitContact').val('');
}

// function confirmSubmit(){
//     $("body").css("overflow","auto");
//     if(logOut){
//         $("#sjSubmitSuccess,.black_overlay").hide();
//     }else{
//         $("#sjSubmitSuccess,.black_overlay").hide();
//         window.location.href = "/openplat-provider/#/userConsole/bussinessWork/workOrder";
//     }
// }
/*验证字数*/
function validate(){
    var $content=$('#content'),
        $error=$(".error_tip .red_tan");
    var content=$content.val();
    if(!content || content.trim().length == 0){
        $error.html("请输入反馈内容");
        $error.css("visibility","visible");
        $(".error_tip").show();
        return false;
    }else if(content.length > 300){
        $error.html("反馈上限为300字，请检查后提交");
        $error.css("visibility","visible");
        $(".error_tip").show();
        return false;
    }
    $error.html("&nbsp;");
    $error.css("visibility","hidden");
    $(".error_tip").hide();
    return true;
}
/*验证手机号或者邮箱*/
function validate_contact_info(){
    var contact_info = $.trim($('#contact_info').val());
    var remail = /^[^\s]*@[\w-]+(\.[\w-]+)+$/;//邮箱
    var phone = /^1[3|4|5|7|8]\d{9}$/;//手机号
    var phone_fixed = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;//固定电话
    var contact_info_box = $('#contact_info_box');
    var html = "<p class='error_info' style='position:absolute;color:red;z-index:3;background:#fff;left:30px;'>联系方式为手机号或邮箱，请检查您的格式是否正确！</p>";
    if(contact_info==''){
        var html = "<p class='error_info' style='position:absolute;color:red;z-index:3;background:#fff;left:30px;'>联系方式不能为空！</p>";
        $(".sl-error").css("display","inline-block");
        $("#error_info").html("联系方式不能为空");
        return false;
    }else{
        if(remail.test(contact_info) || phone.test(contact_info) || phone_fixed.test(contact_info) || contact_info==''){
            $(".sl-error").hide();
            return true;
        }else{
            $(".sl-error").css("display","inline-block");
            $("#error_info").html("联系方式为手机号或邮箱，请检查您的格式是否正确！");
            return false;
        }
    }

}
/**
 *提示信息弹窗
 */
function tips(message,time){
    time=time==undefined?1000:time;
    $.blockUI({
        message: '<div class="con-pop"><div class="inner"><div class="details"><p style="text-align: center">'+message+'</p></div></div></div>',
        timeout:  time,
        overlayCSS : {
            opacity : 0.15,
            cursor:"default"
        },
        css : {
            left:'43%',
            position : 'fixed',
            border:"0px",
            backgroundColor:"none",
            cursor:"auto",
            textAlign:"left"
        }
    });
}
// function checkDescribe(el) {
//     //debugger;
//     if(el.currentTarget){
//         val = $.trim($(el.currentTarget).val()),dom=$(el.currentTarget), errordom = $(el.currentTarget.parentElement.children[1]),
//             textdom = $(el.currentTarget.parentElement.children[1].children[1]);
//     }else{
//         val = $.trim($(el).val()),dom=$(el), errordom = $($(el).parent().children()[2]);
//         //textdom = $($(el).parent().children()[2]);
//     }
//     val = val.replace(/\s+/g, "");
//     if(val==''){
//         dom.css('border','1px solid #e24a4a');
//         errordom.text('具体描述不能为空').css("display","block");
//         return false;
//     }else if(val.length>500){
//         dom.css('border','1px solid #e24a4a');
//         errordom.text('输入超出最大限制数').css("display","block");
//         return false;
//     }else{
//         dom.css('border','1px solid #bbbbbb');
//         errordom.css("display","none");
//         return true;
//     }
// }
function checkTel(el) {
    var reg = /^[\d|\-]{8,13}$/;// mobileReg = /^1[0-9]{10}$/, telReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    if(el.currentTarget){
        val = $.trim($(el.currentTarget).val()),dom=$(el.currentTarget), errordom = $(el.currentTarget.parentElement.children[1]),
            textdom = $(el.currentTarget.parentElement.children[1].children[1]);
    }else{
        val = $.trim($(el).val()),dom=$(el), errordom = $($(el).parent().children()[2]);
        //textdom = $($(el.parent().children()[1]).children()[1]);
    }
    //val = val.replace(/\s+/g, "");
    if(val==''){
        dom.css('border','1px solid #e24a4a');
        errordom.text('客户联系电话不能为空').css("display","block");
        return false;
    }else if(!reg.test(val)){
        dom.css('border','1px solid #e24a4a');
        errordom.text('输入格式不正确').css("display","block");
        return false;
    }else{
        dom.css('border','1px solid #bbbbbb');
        errordom.css("display","none");
        return true;
    }
}
// function checkMobile(el) {
//     var reg = /^1[0-9]{10}$/;// mobileReg = /^1[0-9]{10}$/, telReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
//     if(el.currentTarget){
//         val = $.trim($(el.currentTarget).val()),dom=$(el.currentTarget), errordom = $(el.currentTarget.parentElement.children[1]),
//             textdom = $(el.currentTarget.parentElement.children[1].children[1]);
//     }else{
//         val = $.trim($(el).val()),dom=$(el), errordom = $($(el).parent().children()[2]);
//         //textdom = $($(el.parent().children()[1]).children()[1]);
//     }
//     //val = val.replace(/\s+/g, "");
//     if(val==''){
//         dom.css('border','1px solid #e24a4a');
//         errordom.text('商机提交人手机不能为空').css("display","block");
//         return false;
//     }else if(!reg.test(val)){
//         dom.css('border','1px solid #e24a4a');
//         errordom.text('输入格式不正确').css("display","block");
//         return false;
//     }else{
//         dom.css('border','1px solid #bbbbbb');
//         errordom.css("display","none");
//         return true;
//     }
// }
function checkCode(el) {
    var reg = /^\d{6}$/;// mobileReg = /^1[0-9]{10}$/, telReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    if(el.currentTarget){
        val = $.trim($(el.currentTarget).val()),dom=$(el.currentTarget), errordom = $(el.currentTarget.parentElement.children[1]),
            textdom = $(el.currentTarget.parentElement.children[1].children[1]);
    }else{
        val = $.trim($(el).val()),dom=$(el), errordom = $($(el).parent().children()[3]);
        //textdom = $($(el.parent().children()[1]).children()[1]);
    }
    //val = val.replace(/\s+/g, "");
    if(val==''){
        dom.css('border','1px solid #e24a4a');
        errordom.text(' 验证码不能为空').css("display","block");
        return false;
    }else if(!reg.test(val)){
        dom.css('border','1px solid #e24a4a');
        errordom.text('输入格式不正确').css("display","block");
        return false;
    }else{
        dom.css('border','1px solid #bbbbbb');
        errordom.css("display","none");
        return true;
    }
}
function checkName(el){
    //if(el)
    var reg =  /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){1,50}$/;
    if(el.currentTarget){
        val = $.trim($(el.currentTarget).val()),dom=$(el.currentTarget), errordom = $(el.currentTarget.parentElement.children[1]),
            textdom = $(el.currentTarget.parentElement.children[1].children[1]);
    }else{
        val = $.trim($(el).val()),dom=$(el), errordom = $($(el).parent().children()[2]);
        //textdom = $($(el.parent().children()[1]).children()[1]);
    }
    // val = val.replace(/\s+/g, "");
    if(val==''){
        dom.css('border','1px solid #e24a4a');
        errordom.text('客户名称不能为空').css("display","block");
        return false;
    }else if(!reg.test(val)){
        dom.css('border','1px solid #e24a4a');
        errordom.text('输入格式不正确').css("display","block");
        return false;
    }else{
        dom.css('border','1px solid #bbbbbb');
        errordom.css("display","none");
        return true;
    }
}
// function getfocus(type){
//     $("#sjSubmitModal .modal-text-placeholder").hide();
//     if(type==1){
//         $("#sjSubmitModal textarea").focus();
//     }
// }
//function closePop(){
//	$("#popShow,.black_overlay").hide();
//	setTimeout(function(){
//		window.location.href = '/openplat-provider/#/userConsole/bussinessWork/workOrder';
//	},500)
//}
var logOut = '';
/*according to status to do some different operations*/
function islogin(){
    $.ajax({
        url:"/cloud/open/user/islogin.json",
        dataType:"json",
        type:"post",
        success:function (data) {
            //debugger;
            if(data.success){
                if(data.data==false){
                    //$("#sjPhoneItem,#sjCodeItem").show();
                    logOut = true;
                }else{
                    //$("#sjPhoneItem,#sjCodeItem").hide();
                    logOut = false;
                }
            }else{
                tips(data.error_info);
                logOut = true;
            }

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.readyState == 4 && (XMLHttpRequest.status == "200" || textStatus == "OK")){
                tips(textStatus)
            }else{
                tips("调用数据失败，请稍后再试。")
            }
            logOut = true;
        }
    })
}
// //提交工单处理代码
// function submit(){
//     var params = {};
//     //vm.checkDescribe($(".workOrder-des"));
//     var name=$('#sjSubmitName').val(),
//         tel=$.trim($('#sjSubmitTel').val()),
//         contact = $.trim($('#sjSubmitContact').val()),
//         des = $.trim($('#sjSubmitDes').val()),
//         mobile=$.trim($('#sjSubmitPhone').val()),
//         code = $.trim($('#sjSubmitCode').val()),
//         params ={
//             content:(des).replace(/\s+/g, ""),
//             customer_name:name,
//             contact_name:contact,
//             contact_phone:tel,
//             phone:mobile,
//             checkcode:code,
//             feedback_type:3,
//         }
//     //vm.checkTel($(".workOrder-tel"));
//     //vm.checkName($(".workOrder-name"));
//     if(logOut==true){
//         if(!checkName($("#sjSubmitName"))||!checkDescribe($("#sjSubmitDes"))||!checkCode($("#sjSubmitCode"))||!checkMobile($("#sjSubmitPhone"))){
//             return false;
//         }
//     }else{
//         if(!checkName($("#sjSubmitName"))||!checkDescribe($("#sjSubmitDes"))){
//             return false;
//         }
//     }
//
//     $.ajax({
//         url:"/cloud/open/feedback/addFeedbackInfo.json",
//         dataType:"json",
//         type:"post",
//         data:params,
//         success:function (data) {
//             if(data.success==true){
//                 $("#sjSubmitSuccess,.black_overlay").fadeIn();
//                 if(data.data==null){
//                     $("#sjSubmitModal").hide();
//                     $("#sjSubmitSuccess .confirm-content").text("商机已提交成功");
//                     //$("#popShow,.black_overlay").show();
//                 }else{
//                     //$("#sjSubmitModal").hide();
//                     //$("#sjSubmitSuccess .cp-title").text("提交失败");
//                     //$("#sjSubmitSuccess .confirm-content").text("商机提交失败");
//                     //$("#popShow,.black_overlay").show();
//                     tips("商机提交失败");
//                 }
//             }else{
//                 //$("#sjSubmitModal").hide();
//                 //$("#sjSubmitSuccess .cp-title").text("提交失败");
//                 //$("#sjSubmitSuccess .confirm-content").text(data.error_info);
//                 tips(data.error_info);
//             }
//
//
//         },
//         error:function(XMLHttpRequest, textStatus, errorThrown){
//             if(XMLHttpRequest.readyState == 4 && (XMLHttpRequest.status == "200" || textStatus == "OK")){
//                 tips(textStatus)
//             }else{
//                 tips("调用数据失败，请稍后再试。")
//             }
//         }
//     })
// }
/*看不清换一张*/
function change(){
    var timeNow = new Date().getTime();
    $("#changeImg").attr("src","/cloud/open/imageCode/getImageCode.json?time="+timeNow);
}
/*提交*/
//function submit() {
//	var $title=$('#title'),
//		  content=$.trim($('#content').val()),
//		  contact_info = $.trim($('#contact_info').val()),
//		  imageCode = $.trim($('#imageCode_submit').val()),
//		  $error=$(".error_tip .red_tan");
//	var telRes = validate_contact_info();
//	var infoRes = validate();
//	if(!telRes || !infoRes)
//		return;
//	$title.val(content.substring(0,10));
//	param = {
//			content:content,
//			contact_info:contact_info,
//			imageCode:imageCode
//	}
//	$.ajax({
//        url: '/cloud/open/addFeedback.json',
//        type: 'post',
//        dataType: 'json',
//        data: param,
//        success:  function (data) {
//        	if(data.success){
//        		tips("反馈成功")
//        		$('.popUp-layer-yjfk').hide();
//        	}else{
//        		tips(data.error_info)
//        	}
//        },
//        error:function(XMLHttpRequest, textStatus, errorThrown){
//        	if(XMLHttpRequest.readyState == 4 && (XMLHttpRequest.status == "200" || textStatus == "OK")){
//               tips(textStatus)
//           }else{
//               tips("调用数据失败，请稍后再试。")
//           }
//        }
//	})
//}
// var sjSubmitInter ='',sjSubmitFlag = true;
/*倒计时发送*/
function count(){
    var countdown=60,dom = $("#sjSubmitModal .code-get-btn");
    function countDown(){
        if (countdown == 0) {
            //clearInterval(vm.inter);
            clearInterval(sjSubmitInter);
            sjSubmitFlag = true;
            countdown = 60;
            dom.css("cursor","pointer");
            dom.css("color","#00aaee");
            dom.html("获取验证码");
        } else {
            sjSubmitFlag = false;
            countdown--;
            dom.css("color","#bbbbbb");
            dom.css("cursor","default");
            dom.html(countdown+'s后获取');
        }
    }
    sjSubmitInter = setInterval(function(){countDown()},1000);

}

/*获取短信验证码*/
// function getCheckCode(){
//     checkMobile($("#sjSubmitPhone"))
//     if(!checkMobile($("#sjSubmitPhone"))){
//         return false;
//     }
//     if(sjSubmitFlag){
//         sjSubmitFlag = false;
//         count();
//         var param = {
//             phone:$.trim($("#sjSubmitPhone").val())
//         }
//         $.ajax({
//             url: '/cloud/open/getCheckCode.json',
//             type: 'post',
//             dataType: 'json',
//             data: param,
//             success:  function (data) {
//                 if(data.error_info){
//                     tips(data.error_info)
//                 }
//             },
//             error:function(XMLHttpRequest, textStatus, errorThrown){
//                 if(XMLHttpRequest.readyState == 4 && (XMLHttpRequest.status == "200" || textStatus == "OK")){
//                     tips(textStatus)
//                 }else{
//                     tips("调用数据失败，请稍后再试。")
//                 }
//             }
//         })
//     }
// }
/*function validate($event) {
    debugger;
    var tel = $($event).val();
    var mobile = /^1[3|4|5|7|8][0-9]{9}/;
    if(tel){
        if(mobile.test(value)){
            telRes = true;
        }else{
            //return '请输入正确手机号';
            telRes = false;
            $(".sl-error").show();
        }
    }else{
        //return '不能为空';
        telRes = false;
        $(".sl-error").show();
    }
}
var telRes;*/
//判断是否登录
/*function is_login() {
    $.ajax({
        url:"/cloud/open/user/is_login.json",
        dataType:"json",
        type:"post",
        success:function (data) {
            debugger;
            if(!data.data) {
                $("#required").show();
            }else{
                var tel = data.data.contactTel;
                $("#required").hide();
            }
        }
    })
}*/

/*QQ*/
$(function(){
    islogin();
    var kf_icon=$(".kefu_box");
    $(".tab_tips a").click(function(e){
        var eId = $(e.currentTarget).attr("eId");
        ubasClick(ubasBaseInfo,eId);
    })
    kf_icon.hover(function(){
        $(".tab_tips a").mouseover(function(){
            //$(this).addClass("backTop-hover").siblings("a").removeClass("backTop-hover");
            //$($(this).children()[1]).find(".title").css("color","#333");
        })
        $(".tab_tips").css("display","block").stop().animate({left:"-288px",width:"314px"});
    },function(){
        $(".tab_tips").css("display","none").stop().animate({left:"0px",width:"0"});
    })
    var aHover = $(".tab_tips a");
    aHover.hover(function(){
        $($(this).children()[1]).find(".title").css("color","#00aaee");
    },function(){
        $($(this).children()[1]).find(".title").css("color","#333");
    })
    setTimeout(function(){
        $("#sjSubmitModal input,#sjSubmitModal textarea").focus(function(el){
            $(el.currentTarget).css("border","1px solid #bbbbbb");
            $($(el.currentTarget).parent().find(".modal-input-error")).hide();
            $(".form-line-wrapper .input").css("border","none")
        })
        if(logOut){
            $("#sjSubmitModal").css("margin-top","-300px");
        }else{
            $("#sjSubmitModal").css("margin-top","-245px");
        }
    },500)
});
	
