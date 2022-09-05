/**
 * Created by rk on 16-7-19.
 */
require(["domReady!","avalon","jquery","common/common","pager","jquery.cookie","header"],function (dom,avalon,$,common){

    var vm = avalon.define({
        $id:"docSearch",
        search_doc:decodeURIComponent(common.getUrlParam("content")),//搜索关键字
        cursor:0,
        hotSearchList:[],
        searchList:[],  //搜索列表页
        //baseArr:[],
        //apiArr:[],
        //ufxArr:[],
        //courseArr:[],
        //faqArr:[],
        clickType:'',
        typeList:{
            'doc':'基础文档',
            'api':'API文档',
            'ufx':'UFX文档',
            'course':'视频教程',
            'faq':'FAQ'
        },
        countObj:{
            total_count:'',
            doc_count:'',
            api_count:'',
            course_count:'',
            ufx_count:'',
            faq_count:'',
            product_doc_count:"",
        },
        isSearch:common.getUrlParam("content")?true:false,
        isLogin:'',
        pager:{
            currentPage: 1,
            totalItems: 0,
            perPages:10,
            showJumper: true,
            onJump: function(e, data) {
                vm.pager.currentPage = data.currentPage;
                vm.$render();
            }
        },
        $render:function(){
            vm.search_doc=$.trim(vm.search_doc);
            var param={
                pageSize:vm.pager.perPages,
                currentPage:avalon.vmodels.docListPager.currentPage,
                content:vm.search_doc,
                type: vm.clickType,
                //tenant_id:202
            }
            vm.searchAjax(param);
        },
        changeSearchType: function(type) {
            if(vm.clickType==type){
                return
            }
            if(vm.search_doc==''){
                common.tips("搜索关键字不能为空，请输入您感兴趣的关键字！");
                return;
            }
            vm.clickType = type;
            avalon.vmodels.docListPager.currentPage = 1;
            var param={
                pageSize:vm.pager.perPages,
                currentPage:avalon.vmodels.docListPager.currentPage,
                content:vm.search_doc,
                type:type,
            }
            vm.searchAjax(param);
        },
        /***获取热搜词汇***/
        getHotSearch: function(){
            common.ajax({
                url : "word/queryHotSearchWord.json",
                dataType : "json" ,
                type:"post",
                async:false,
                //data:param,
                callback: function(data){
                    vm.hotSearchList = data.list;
                },
                failure:function(r){
                    common.alertNodePop(r.error_info);
                }
            })
        },
        /*提示信息弹窗*/
        tips:function(message,time){
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
        },
        submitQuery:function(e){
            e=e||event;
            var keycode = (e.keyCode ? e.keyCode : e.which);
            vm.search_doc=$.trim(vm.search_doc);
            if(keycode == '13'&&vm.search_doc!=""){
                //vm.show();
                //按下回车键跳转搜索结果页
                //vm.pager.currentPage=1;
                //var param={
                //    pageSize:vm.pager.perPages,
                //    currentPage:1,
                //    content:vm.search_doc,
                //    tenant_id:202
                //}
                window.location.href = '/doc/result.html?content=' + encodeURIComponent(vm.search_doc);
            }

        },
        queryByKeyWords:function(type,e){
            window.location.href="?keyWords="+vm.search_doc;
        },
        searchDoc:function(){
            $('.oni-pager-textbox').val(1);
            vm.search_doc=$.trim(vm.search_doc);
            gdp('track','OP_validSearchBoxClick',{pageName_var: document.title, hsUserId_var: ubasBaseInfo.c_hsid || '-',searchContent_var:vm.search_doc || '-'})
            if(vm.search_doc!=""){
                window.location.href = '/doc/result.html?content=' + encodeURIComponent(vm.search_doc);
            }else{
                common.tips("搜索关键字不能为空，请输入您感兴趣的关键字！");
            }
        },
        search:function(){
            vm.search_doc=$.trim(vm.search_doc);
            var param={
                pageSize:vm.pager.perPages,
                currentPage:vm.pager.currentPage,
                content:vm.search_doc,
                //tenant_id:202
            }
            vm.searchAjax(param);
        },
        //转义符处理函数
        escape2Html:function(str) {
            var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
            return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
        },
        getNum:function(num){
            if(typeof(num)=='number'){
                return num>999?'999+':num;
            }else{
                return '--';
            }

        },
        searchAjax:function(param){
            common.ajax({
                url : "library/doc/searchAll.json",
                dataType : "json",
                type:"post",
                data:param,
                async:false,
                callback: function(data){
                    var pager = $('.pager');
                    $(".search-list-wrapper").show();
                    //vm.searchList= data.beanList;
                    //处理查询条数数据
                    vm.countObj.api_count = vm.getNum(data.api_count);
                    vm.countObj.ufx_count = vm.getNum(data.ufx_count);
                    vm.countObj.course_count = vm.getNum(data.course_count);
                    vm.countObj.faq_count = vm.getNum(data.faq_count);
                    vm.countObj.doc_count = vm.getNum(data.doc_count);
                    vm.countObj.product_doc_count = vm.getNum(data.product_doc_count)
                    var total = data.api_count +data.ufx_count + data.course_count+data.faq_count+data.doc_count+data.product_doc_count;
                    vm.countObj.total_count = vm.getNum(total);
                    if(data.beanList.length>0){
                        pager.show();
                        var list=data.beanList,con= '';
                        for (var i = 0; i < list.length; i++) {
                            var con = list[i].doc_content;
                            if(vm.search_doc!=""){//如果搜索出的内容不为空，将内容进行转义
                                con=vm.escape2Html(con);
                                con=con.replace(/<\/?.+?>/g,"");
                                con=con.replace(/\s/g,"");
                                con=con.replace(new RegExp("&nbsp;","gm"),"");
                            }
                            list[i].tag = list[i].service_keyword.split(",")[0];
                            con = con.replace(new RegExp(vm.search_doc,"gm"),'<span class="redHighlight">'+vm.search_doc+'</span>');

                            list[i].doc_content=con.length>280?con.substring(0,280)+"...":con;
                            var tit = list[i].doc_name;
                            tit = tit.replace(new RegExp(vm.search_doc,"gm"),'<span class="redHighlight">'+vm.search_doc+'</span>');
                            //list[i].doc_content=con.length>280?con.substring(0,280)+"...":con;
                            if(list[i].type=="course"){  //视频名称和其他的不一致
                                var tit=list[i].course_name;
                            }else{
                                var tit=list[i].doc_name;
                            }
                            tit = tit.replace(new RegExp(vm.search_doc,"gm"),'<span class="redHighlight">'+vm.search_doc+'</span>');
                            list[i].doc_name=tit;
                            vm.searchList= list;
                            //var searchType = vm.searchList[i].type;
                            //if(searchType == 'doc') {
                            //    vm.searchList[i].menu_tag = vm.typeList[searchType];
                            //    //vm.baseArr.push(vm.searchList[i]);
                            //}else if(searchType == 'api') {
                            //    vm.searchList[i].menu_tag = vm.typeList[searchType];
                            //    //vm.apiArr.push(vm.searchList[i]);
                            //}else if(searchType == 'ufx') {
                            //    vm.searchList[i].menu_tag = vm.typeList[searchType];
                            //    //vm.ufxArr.push(vm.searchList[i]);
                            //}else if(searchType == 'course') {
                            //    vm.searchList[i].menu_tag = vm.typeList[searchType];
                            //    //vm.courseArr.push(vm.searchList[i]);
                            //}else if(searchType == 'faq') {
                            //    vm.searchList[i].menu_tag = vm.typeList[searchType];
                            //    //vm.faqArr.push(vm.searchList[i]);
                            //}
                        }
                        setTimeout(function(){
                            avalon.vmodels.docListPager.totalItems = data.totalItem;
                        },100)
                        $(".loading").hide();
                        $(".search-list-wrapper").show();
                        $("#nodataDocSe").hide();
                        $(".pager").show();
                        //$('body, html').animate({ scrollTop: 200 }, 200);
                    }else{
                        $(".search-list-wrapper").hide();
                        pager.hide();
                        $("#nodataDocSe").show();
                        $(".pager").hide();
                        vm.search_apiList=[];
                    }
                }
            })
        },
        queryLibraryContent:function(pid,sid,service_id, restful_uri, doc_type, doc_name,serial_no,ubasId,courseId,faqId,view_right,tree_id){
            ubasBaseInfo.c_prodname = '【搜索- 列表】' + doc_name;
            //vm.ubasClick(ubasBaseInfo,ubasId);
            var doc_title = doc_name.replace(/<[^>]+>/g,"")
            gdp('track','OP_searchResultItemClick',{pageName_var: document.title, hsUserId_var: ubasBaseInfo.c_hsid || '-',resultItemName_var:doc_title || '-'})

            var type = $(this).prop('type');//获取当前点击元素的自定义属性type的值
            if(type=='doc'){//文档类型是doc
                window.open("/doc/"+pid+"_"+sid+".html");
            }else if(type=='api'){//api类型是api
                var url = '/api.html';
                doc_name = doc_name.replace(/<[^>]+>/g,"");
                if(doc_type.trim() == '服务页') {
                    if(doc_name.trim() == '文档首页') {
                        url = '/api.html';
                    } else {
                        url = '/wiki/service/' + service_id.trim() + '.html';
                    }
                } else if(doc_type.trim() == '接口页') {
                    if(doc_name.trim() == 'object参数页') {
                        url = '/wiki/api/objects.html';
                    } else if(doc_name.trim() == '标准字典页') {
                        url = '/wiki/api/dict.html';
                    } else {
                        url = '/wiki/api/' + service_id.trim() + restful_uri.replace(/\//g, '_').trim() + '.html';
                    }
                }
                window.open(url);
            }else if(type=="course"){
                window.open('/openDay/trainDetail.html?courseId=' + courseId);
            }else if(type=="faq"){
                if(view_right==1||((view_right==2)&&vm.isLogin)){
                    window.open('/faqPage.html?faq_id=' +faqId);
                }else{
                    vm.goLogin();
                }
            }else if(type=='ufx'){
                window.open("/doc/ufx/"+pid+"_"+sid+".html");
            }else if(type=='product_doc'){
                window.open("/cloud/open/faq/productTemplateDetail.html?id=" + tree_id + "&tree_id=" + sid);
            }
        },
        goLogin:function(){
            $(".doc-warn-pop,.doc-black-sheild").show();
            $("body").css("overflow","hidden");
        },
        getLoginStatus:function(){
            common.ajax({
                url : "user/islogin.json" ,
                dataType : "json" ,
                type:"post",
                callback: function(data){
                    vm.isLogin = data==false?false:true;
                }
            })
        },
        ubasClick:function (ubasBaseInfo,ubasId) {
            //Countly.q.push(['customEvent', {
            //    eventId:'vid_' + ubasId,
            //    other: ubasBaseInfo
            //}]);
        },

    });
    vm.search_doc=$.trim(vm.search_doc);
    if(vm.search_doc!=""){
        vm.isSearch=true;
        vm.search();
    }

    $(function() {
        /***TODO: doc和doc/ufx命名冲突导致的锚点指向不正确***/
        var url = window.location.href;
        vm.cursor = url.search("supportCM")!=-1?1:((url.search('doc')!=-1&&url.search('ufx')==-1)?2:(url.search('api')!=-1?3:
            (url.search('ufx')!=-1?4:(url.search('training')!=-1?5:((url.search('product')!=-1?7:(url.search('faq')!=-1?6:"")))))));

        vm.getHotSearch();
        vm.getLoginStatus();

    });
    avalon.filters.changeTypeName = function(str, args, args2){
        /* 具体逻辑 */
        return vm.typeList[str];
    }

    avalon.scan();
})


