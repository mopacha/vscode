<!DOCTYPE html><html lang=""><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,minimum-scale=1,maximum-scale=1"><link rel="icon" href="/iuc/favicon.ico?t=random"><title>恒生客户服务平台-金融机构和恒生服务交互的生态平台</title><script src="/iuc/sysconfig.js?t1660808016380"></script><script src="https://www.hs.net/r/cms/www/iucFront/staticRecource.js"></script><script src="/iuc/checkLogin.js?t1660808016380"></script><script>!function (e, t, n, g, i) { e[i] = e[i] || function () { (e[i].q = e[i].q || []).push(arguments) }, n = t.createElement("script"), tag = t.getElementsByTagName("script")[0], n.async = 1, n.src = g, tag.parentNode.insertBefore(n, tag) }(window, document, "script", "https://assets.giocdn.com/cdp/1.0/gio.js", "gdp");

    try {
      window.gdp('init', window.LOCAL_CONFIG.buriedProjectId, window.LOCAL_CONFIG.buriedDataSourceId, {
        host: 'growtrack.hs.net',
        "hashtag": true, // 取hash后内容
        "dataCollect": true,// 是否采集数据
        "scheme": "https",
        "debug": false,
        "compress": true
      });
      //custom page code begin here
      //custom page code end here
      window.gdp('send');
    } catch (e) {
      console.log('不支持gio')
      console.log(e);
    }</script><script>!(function (a, b, c) {
      function d(a) {
        var c = "default";
        a.self_redirect === !0
          ? (c = "true")
          : a.self_redirect === !1 && (c = "false");
        var d = b.createElement("iframe"),
          e =
            "https://open.weixin.qq.com/connect/qrconnect?appid=" +
            a.appid +
            "&scope=" +
            a.scope +
            "&redirect_uri=" +
            a.redirect_uri +
            "&state=" +
            a.state +
            "&login_type=jssdk&self_redirect=" +
            c +
            "&styletype=" +
            (a.styletype || "") +
            "&sizetype=" +
            (a.sizetype || "") +
            "&bgcolor=" +
            (a.bgcolor || "") +
            "&rst=" +
            (a.rst || "");
        (e += a.style ? "&style=" + a.style : ""),
          (e += a.href ? "&href=" + a.href : ""),
          (d.src = e),
          (d.frameBorder = "0"),
          (d.allowTransparency = "true"),
          // 解决微信内嵌iframe跨越问题
          (d.sandbox =
            "allow-scripts allow-top-navigation allow-same-origin"),
          (d.scrolling = "no"),
          (d.width = "220px"),
          (d.height = "220px");
        var f = b.getElementById(a.id);
        (f.innerHTML = ""), f.appendChild(d);
      }
      a.WxLogin = d;
    })(window, document);</script><link href="/iuc/css/chunk-27553fb0.84950e8c.css" rel="prefetch"><link href="/iuc/css/chunk-5256dd9f.4c043143.css" rel="prefetch"><link href="/iuc/css/chunk-615c7224.e145a964.css" rel="prefetch"><link href="/iuc/css/chunk-85ba070e.06a14d60.css" rel="prefetch"><link href="/iuc/css/chunk-9cdab5c4.b7a4c2cb.css" rel="prefetch"><link href="/iuc/css/chunk-ffd98784.8d8c7888.css" rel="prefetch"><link href="/iuc/js/chunk-27553fb0.b34f3cc6.js" rel="prefetch"><link href="/iuc/js/chunk-5256dd9f.21dfabed.js" rel="prefetch"><link href="/iuc/js/chunk-615c7224.da6551fd.js" rel="prefetch"><link href="/iuc/js/chunk-85ba070e.67507eb7.js" rel="prefetch"><link href="/iuc/js/chunk-9cdab5c4.39c75606.js" rel="prefetch"><link href="/iuc/js/chunk-ffd98784.8251b863.js" rel="prefetch"><link href="/iuc/css/app.a192b0b0.css" rel="preload" as="style"><link href="/iuc/css/chunk-vendors.03030691.css" rel="preload" as="style"><link href="/iuc/js/app.fa840b7a.js" rel="preload" as="script"><link href="/iuc/js/chunk-vendors.80667135.js" rel="preload" as="script"><link href="/iuc/css/chunk-vendors.03030691.css" rel="stylesheet"><link href="/iuc/css/app.a192b0b0.css" rel="stylesheet"></head><body><script>//是移动端返回true,否则false
    function isMobile() {
      return (/phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|webOS|android/i.test(navigator.userAgent))
    }
    setBaseFontSize()
    window.addEventListener('resize', function () { setTimeout(setBaseFontSize, 100) })
    // 设置根元素字体大小
    function setBaseFontSize() {
      var oHtml = document.getElementsByTagName('html')[0];
      if (isMobile()) {
        //自适应
        var oWidth =
          document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        oHtml.style.fontSize = (oWidth / 750) * 100 + 'px';
        if (oWidth == 0) {
          //解决在三星和OPPO下重复进入页面有时无样式问题（解决方法，无样式的话发现html中的fontsize为0，那么可以推断这里的oWidth为0，那么出现这种情况对页面重新加载一次以解决）
          window.location.reload();
        }
        document.body.className = ''
      } else {
        oHtml.style.fontSize = '16px'
        document.body.className = 'pc-container'
      }
    }</script><noscript><strong>We're sorry but unified-auth doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript><div id="app"></div><script src="/iuc/js/chunk-vendors.80667135.js"></script><script src="/iuc/js/app.fa840b7a.js"></script></body></html>