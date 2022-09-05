/*! fingerprintjs 2013-12-12 - v0.5.1 */
!function(a){"use strict";var b=function(a){var b,c;b=Array.prototype.forEach,c=Array.prototype.map,this.each=function(a,c,d){if(null!==a)if(b&&a.forEach===b)a.forEach(c,d);else if(a.length===+a.length){for(var e=0,f=a.length;f>e;e++)if(c.call(d,a[e],e,a)==={})return}else for(var g in a)if(a.hasOwnProperty(g)&&c.call(d,a[g],g,a)==={})return},this.map=function(a,b,d){var e=[];return null==a?e:c&&a.map===c?a.map(b,d):(this.each(a,function(a,c,f){e[e.length]=b.call(d,a,c,f)}),e)},"object"==typeof a?(this.hasher=a.hasher,this.screen_resolution=a.screen_resolution,this.canvas=a.canvas,this.ie_activex=a.ie_activex):"function"==typeof a&&(this.hasher=a)};b.prototype={get:function(){var a=[];if(a.push(navigator.userAgent),a.push(navigator.language),a.push(screen.colorDepth),this.screen_resolution){var b=this.getScreenResolution();"undefined"!=typeof b&&a.push(this.getScreenResolution().join("x"))}return a.push((new Date).getTimezoneOffset()),a.push(this.hasSessionStorage()),a.push(this.hasLocalStorage()),a.push(!!window.indexedDB),document.body?a.push(typeof document.body.addBehavior):a.push("undefined"),a.push(typeof window.openDatabase),a.push(navigator.cpuClass),a.push(navigator.platform),a.push(navigator.doNotTrack),a.push(this.getPluginsString()),this.canvas&&this.isCanvasSupported()&&a.push(this.getCanvasFingerprint()),this.hasher?this.hasher(a.join("###"),31):this.murmurhash3_32_gc(a.join("###"),31)},murmurhash3_32_gc:function(a,b){var c,d,e,f,g,h,i,j;for(c=3&a.length,d=a.length-c,e=b,g=3432918353,h=461845907,j=0;d>j;)i=255&a.charCodeAt(j)|(255&a.charCodeAt(++j))<<8|(255&a.charCodeAt(++j))<<16|(255&a.charCodeAt(++j))<<24,++j,i=(65535&i)*g+(((i>>>16)*g&65535)<<16)&4294967295,i=i<<15|i>>>17,i=(65535&i)*h+(((i>>>16)*h&65535)<<16)&4294967295,e^=i,e=e<<13|e>>>19,f=5*(65535&e)+((5*(e>>>16)&65535)<<16)&4294967295,e=(65535&f)+27492+(((f>>>16)+58964&65535)<<16);switch(i=0,c){case 3:i^=(255&a.charCodeAt(j+2))<<16;case 2:i^=(255&a.charCodeAt(j+1))<<8;case 1:i^=255&a.charCodeAt(j),i=(65535&i)*g+(((i>>>16)*g&65535)<<16)&4294967295,i=i<<15|i>>>17,i=(65535&i)*h+(((i>>>16)*h&65535)<<16)&4294967295,e^=i}return e^=a.length,e^=e>>>16,e=2246822507*(65535&e)+((2246822507*(e>>>16)&65535)<<16)&4294967295,e^=e>>>13,e=3266489909*(65535&e)+((3266489909*(e>>>16)&65535)<<16)&4294967295,e^=e>>>16,e>>>0},hasLocalStorage:function(){try{return!!a.localStorage}catch(b){return!0}},hasSessionStorage:function(){try{return!!a.sessionStorage}catch(b){return!0}},isCanvasSupported:function(){var a=document.createElement("canvas");return!(!a.getContext||!a.getContext("2d"))},isIE:function(){return"Microsoft Internet Explorer"===navigator.appName?!0:"Netscape"===navigator.appName&&/Trident/.test(navigator.userAgent)?!0:!1},getPluginsString:function(){return this.isIE()?this.getIEPluginsString():this.getRegularPluginsString()},getRegularPluginsString:function(){return this.map(navigator.plugins,function(a){var b=this.map(a,function(a){return[a.type,a.suffixes].join("~")}).join(",");return[a.name,a.description,b].join("::")},this).join(";")},getIEPluginsString:function(){var b=["ShockwaveFlash.ShockwaveFlash","AcroPDF.PDF","PDF.PdfCtrl","QuickTime.QuickTime","rmocx.RealPlayer G2 Control","rmocx.RealPlayer G2 Control.1","RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)","RealVideo.RealVideo(tm) ActiveX Control (32-bit)","RealPlayer","SWCtl.SWCtl","WMPlayer.OCX","AgControl.AgControl","Skype.Detection"];return this.ie_activex&&a.ActiveXObject?this.map(b,function(a){try{return new ActiveXObject(a),a}catch(b){return null}}).join(";"):""},getScreenResolution:function(){return[screen.height,screen.width]},getCanvasFingerprint:function(){var a=document.createElement("canvas"),b=a.getContext("2d"),c="http://valve.github.io";return b.textBaseline="top",b.font="14px 'Arial'",b.textBaseline="alphabetic",b.fillStyle="#f60",b.fillRect(125,1,62,20),b.fillStyle="#069",b.fillText(c,2,15),b.fillStyle="rgba(102, 204, 0, 0.7)",b.fillText(c,4,17),a.toDataURL()}},"object"==typeof module&&"object"==typeof exports&&(module.exports=b),a.Fingerprint=b}(window);
(function (scope) {
  //获取appkey
  var str = document.getElementById('user_analysis_id').src
  str = (str.match(new RegExp("(?:\\?|&)"+'appkey'+"=(.*?)(?=&|$)"))||['',null])[1]
  var hssdk_plat_type = str
  var hssdk_set_time = ''
  var hssdk_start_time = +new Date()
  var interval_second = 30000;//循环时间
  var hssdk_url = 'https://www.hs.net/hssdk/bdata/sendLog';
  var hssdk_version = 'V1.0.2';
  var hssdk_old_url = window.location.href //初始url

  clearInterval(hssdk_set_time)
  hssdk_click({c_eventid:'open_page'});// 打开页面时默认调用
  hssdk_set_time = setInterval(function () {
    hssdk_click({c_eventid:'stay_page'})
  },interval_second);

  setInterval(function () {//每时监听路由是否变化
    if(hssdk_old_url!== window.location.href){//路由变化
      clearInterval(hssdk_set_time)
      hssdk_click({c_eventid:'close_page'})
      hssdk_old_url = window.location.href
      hssdk_click({c_eventid:'open_page'});
      hssdk_set_time = setInterval(function () {
        hssdk_click({c_eventid:'stay_page'})
      },interval_second);
    }
  },2000);
  //兼容性处理
  function getVisibilityState() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    if ('visibilityState' in document) return 'visibilityState';
    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'VisibilityState') in document)
            return prefixes[i] + 'VisibilityState';
    }
    return null;
  };
  document.addEventListener("visibilitychange", function() {
      if(document[getVisibilityState()].indexOf('hidden') != -1 ){
          // 不在当前页
          clearInterval(hssdk_set_time)
          hssdk_click({c_eventid:'close_page'})
      }else if (document[getVisibilityState()].indexOf('visible') != -1){
          //回到当前页
          hssdk_start_time = +new Date()
          hssdk_click({c_eventid:'open_page'});
          hssdk_set_time = setInterval(function () {
            hssdk_click({c_eventid:'stay_page'})
          },interval_second);
      };
  });

  // 事件调用入口
  function hssdk_click(params){
    let hssdk_time = +new Date()
    let hssdk_stay_time = parseInt((hssdk_time - hssdk_start_time) / 1000)
    hssdk_start_time = hssdk_time
    //入参设置
    let data = {};
    //1.公共属性字段
    data.header = {};
    //必填
    data.header.c_logtype = "B";//日志头-默认传B
    data.header.c_platform = "pc";//平台-默认pc
    data.header.c_secretcode = "";//校验值-传空字符串
    data.header.c_ip = "";//ip-传空字符串
    data.header.c_appkey = hssdk_plat_type || "";//应用id
    data.header.c_deviceid = "";//设备id（浏览器指纹）
    data.header.c_referer = document.referrer;//头部的来源信息-跳转来源url
    //非必填
    data.header.c_sdkversion = hssdk_version;//sdk版本/js版本
    data.header.c_devicetype = getBrowserInfo();//设备类型（浏览器版本）
    //2.事件属性字段
    data.events = new Array();
    data.events[0] = {};
    //必填
    data.events[0].l_time = new Date().getTime();//业务时间（客户端时间）
    data.events[0].c_type = "page";//数据类型
    data.events[0].c_sessionid = "";//会话id-传空字符串
    data.events[0].c_eventid = params&&params.c_eventid? params.c_eventid : 'click_info';//事件（页面）id-页面加载 c_eventid:open_page,定时c_eventid:stay_page,离开 c_eventid:close_page,主动事件调用 c_eventid:click_info
    // 非必填
    data.events[0].c_domain = window.location.hostname;//当前域名
    data.events[0].c_uri = hssdk_old_url;//当前路径
    data.events[0].c_userid = params&& params.c_userid?params.c_userid: "";//用户id（主动事件入参）
    data.events[0].c_gender= params&&params.c_gender? params.c_gender :"";//性别（f:女 m:男）统一为小写(主动事件入参)
    data.events[0].i_age= params&&params.i_age? params.i_age : "";//年龄(主动事件入参)
    data.events[0].c_other= params&&params.c_other? params.c_other : "";//业务属性（格式：json格式）eg:{"phone":"13852222222","email":"mail@163.com"}(主动事件入参)
    data.events[0].c_pagename = params&&params.c_pagename ? params.c_pagename :"";//页面名称(主动事件入参)
    data.events[0].c_event_info= params&&params.c_event_info ? params.c_event_info :"";//事件埋点事件名
    data.events[0].l_duration = params&&params.c_eventid=='click_info'? 0 : params.c_eventid=='open_page'?1:hssdk_stay_time;//停留时长

    //获取浏览器指纹
    if(typeof(Fingerprint)!="undefined"){
      data.header.c_deviceid = new Fingerprint().get();
    }
	if(typeof(Fingerprint)!="undefined"){
		// 新的指纹，存放在c_secretcode
      let secretcode = '' + (new Fingerprint({screen_resolution: true}).get()) + '_' + (new Fingerprint({canvas: true}).get());
      data.header.c_secretcode = secretcode;
    }
    //设置请求
    if(window.XMLHttpRequest){
      var xhr=new XMLHttpRequest();
    }else{
      //ie6及其以下版本浏览器
      var xhr=ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.open('post', hssdk_url, 'false');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
      if ( xhr.status == 200) {
        // console.log(xhr.status)
      } else{
        console.log("[" + xhr.status + "]");
      }
    };
  }

  //获取浏览器类型和版本
  function getBrowserInfo(){
    let Sys = "default";
    let ua = navigator.userAgent.toLowerCase();
    let re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
    let m = ua.match(re);
    if(m){
      Sys = m[1].replace(/version/, "'safari") + m[2]
    } 
    return Sys;
  }

  if (typeof module === 'object' && typeof exports === 'object') {
    module.exports = hssdk_click;
  }
  scope.hssdk_click = hssdk_click;
})(window)