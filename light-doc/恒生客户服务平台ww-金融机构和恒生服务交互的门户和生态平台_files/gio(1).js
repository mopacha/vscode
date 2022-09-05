var script =  document.querySelector('#webburiedpoint')
<!-- 初始化配置信息 -->
   var option = JSON.parse(script.attributes['option'].value)
<!-- 枚举生产环境所有的域名 -->
var productHostName = ["www.hs.net","hsl.hs.net","boss.hs.net","data.hs.net","ufx.hs.net","hs.net"]
var ProjectID = 'b3222f5ad5658c1a',DatasourceID='b31ca2cc769505e0'
var loc_host = location.hostname
var isHost = productHostName.some(val => val === loc_host)
option.debug = false
option.compress = false

if(isHost) {
  ProjectID  = 'b3222f5ad5658c1a'
  DatasourceID = '9464b064aeb38821'
  option.debug = false
  option.compress = false
}

//配置后file协议才能产生事件，默认值false。该配置在3.2.0版本起生效
window._gr_ignore_local_rule = true
   !(function(e, t, n, g, i) {
        (e[i] =
          e[i] ||
          function() {
            (e[i].q = e[i].q || []).push(arguments);
          }),
          (n = t.createElement("script")),
          (tag = t.getElementsByTagName("script")[0]),
          (n.async = 1),
          (n.src = g),
          tag.parentNode.insertBefore(n, tag);
      })(window, document, "script", "https://assets.giocdn.com/sdk/cdp/gio.js", "gdp");
      gdp("init", ProjectID , DatasourceID, option );

      //custom page code begin here
      //custom page code end here
      gdp("send");

//hssdk引入

// var cly = cly || [];
// (function () {
//   var cly = document.createElement("script");
//   cly.type = "text/javascript";
//   cly.async = true;
//   cly.src =
//     "https://www.hs.net/r/cms/www/itn/js/userAnalysis.js?appkey=NDhfMQ==";
//   cly.id = "user_analysis_id";
//   var s = document.getElementsByTagName("script")[0];
//   s.parentNode.insertBefore(cly, s);
// })()


      let yycount = 0;
      let yytime = setInterval(() => {
        const node = document.querySelector("a[href='http://www.winner123.cn/']");
        yycount++;
        if(yycount >= 5) clearInterval(yytime)
        if (node) {
          node.setAttribute('style', 'display:none');
          clearInterval(yytime)
        }
      }, 1000)