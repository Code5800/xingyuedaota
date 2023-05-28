var $app = $('#app-center'), $uc = $('#user-center'), $nav = $('#top-nav');
    //isLogin = cookie('MLOGIN') == 1 ? true : false;
$app.click(function(event){
        (event && event.stopPropagation) && event.stopPropagation() || (event.cancelBubble = true);
        if($(this).is('.c')){
            $nav.css({'height' : 0, 'opacity' : 0,"visibility":"hidden" });
            $app.removeClass('c');
        }else{
            $nav.css({'height' : '100px', 'opacity' : 1 ,"visibility":"visible"});
            $(this).addClass('c');
        }
});

var getUat=navigator.userAgent.toLowerCase();
var isIOS=getUat.match(/(iphone|ipad|ipod)/i)?true:false;

var sortData,giftData,gameData,lb;
$(function(){   
    $.extend({
        sortRequest:function(obj,callBack){
            $.ajax({
                url:'/wap/index/cate',
                type:'POST',
                cache:false,
                dataType:"jsonp",
                data: obj,
                success:function(data){
                    sortData=data;
                    if (data.state=='1') {
                        if(callBack) callBack();
                    };
                }
            });
        },
        raiRequest:function(obj,callBack){
            $.ajax({
                url:'/wap/Raiders/Raiderlist',
                type:'POST',
                cache:false,
                dataType:"jsonp",
                data: obj,
                success:function(data){
                    sortData=data;
                    if (data.state=='1') {
                        if(callBack) callBack();
                    };
                }
            });
        },
        ActRequest:function(obj,callBack){
            $.ajax({
                url:'/wap/Activity/Activitylist',
                type:'POST',
                cache:false,
                dataType:"jsonp",
                data: obj,
                success:function(data){
                    sortData=data;
                    if (data.state=='1') {
                        if(callBack) callBack();
                    };
                }
            });
        },
        NewsRequest:function(obj,callBack){
            $.ajax({
                url:'/wap/Journalism/Newslist',
                type:'POST',
                cache:false,
                dataType:"jsonp",
                data: obj,
                success:function(data){
                    sortData=data;
                    if (data.state=='1') {
                        if(callBack) callBack();
                    };
                }
            });
        },
        evalsRequest:function(obj,callBack){
            $.ajax({
                url:'/wap/index/evalsurl',
                type:'POST',
                cache:false,
                dataType:"jsonp",
                data: obj,
                success:function(data){
                    sortData=data;
                    if (data.state=='1') {
                        if(callBack) callBack();
                    };
                }
            });
        },
        giftRequest:function(obj,callBack){
            $.ajax({
                url:'/wap/Package/gift',
                type:'POST',
                cache:false,
                dataType:"jsonp",
                data: obj,
                success:function(data){
                    giftData=data;
                    if (data.state=='1') {
                        if(callBack) callBack();
                    };
                }
            });
        },
        gameRequest:function(obj,callBack){
            $.ajax({
                url:'/wap/game/game',
                type:'POST',
                cache:false,
                dataType:"jsonp",
                data: obj,
                success:function(data){
                    gameData=data;
                    if (data.state=='1') {
                        if(callBack) callBack();
                    };
                }
            });
        },
        setUnorlist:function(note,opt,n){
            var gurl=opt.data[n].WURL?opt.data[n].WURL:'javascript:;',
                iOS=opt.data[n].GCDLI?opt.data[n].GCDLI:"javascript:alert('抱歉，此游戏暂无iOS版本！');",
                android=opt.data[n].GCDLA?opt.data[n].GCDLA:"javascript:alert('敬请期待！');";
            var downloadUrl=isIOS?iOS:android;
            if(!opt.data[n].url){
                opt.data[n].url = downloadUrl;
            }
            var setNote='<div class="game-row cl">'+
                        '<a class="game-link cl z" title="'+opt.data[n].gamename+'" href="/Wap/Game/gamedetails/id/'+opt.data[n].id+'">'+
                            '<div class="game-icon z"><img alt="'+opt.data[n].gamename+'" src="'+opt.data[n].pic1+'"></div>'+
                            '<div class="game-msg z">'+
                                '<div class="gamei-title">'+opt.data[n].gamename+'</div>'+
                                '<div class="iconfont">'+$.setStar(opt.data[n].grade)+'</div>'+
                                '<div class="game-summary ell">'+opt.data[n].keywords+'</div>'+
                            '</div>'+
                        '</a>'+
                        '<div class="game-down-btn y"><a title="'+opt.data[n].gamename+'下载" href=http://"'+opt.data[n].url+'">下载</a></div>'+
                    '</div>';
            $(note).append(setNote);
            setNote=gurl=iOS=android=downloadUrl=null;
        },
        setOrderlist:function(note,opt,n,l){
            var lt=l;
            if (lt>4) lt=4;
            var gurl=opt.data[n].WURL?opt.data[n].WURL:'javascript:;',
                iOS=opt.data[n].GCDLI?opt.data[n].GCDLI:"javascript:alert('抱歉，此游戏暂无iOS版本！');",
                android=opt.data[n].GCDLA?opt.data[n].GCDLA:"javascript:alert('敬请期待！');";
            var downloadUrl=isIOS?iOS:android;
            if(!opt.data[n].url){
                opt.data[n].url = downloadUrl;
            }
            var setNote='<div class="game-row cl">'+
                        '<div class="tag-box z"><div class="ln-tag lt'+lt+'"><span>'+l+'</span><i></i></div></div>'+
                        '<a class="game-link cl z" title="'+opt.data[n].gamename+'" href="/Wap/Game/gamedetails/id/'+opt.data[n].id+'">'+
                            '<div class="game-icon z"><img alt="'+opt.data[n].gamename+'" src="'+opt.data[n].pic1+'"></div>'+
                            '<div class="game-msg z">'+
                                '<div class="gamei-title">'+opt.data[n].gamename+'</div>'+
                                '<div class="iconfont">'+$.setStar(opt.data[n].grade)+'</div>'+
                                '<div class="game-summary ell">'+opt.data[n].keywords+'</div>'+
                            '</div>'+
                        '</a>'+
                        '<div class="game-down-btn y"><a title="'+opt.data[n].gamename+'下载" href=http://"'+opt.data[n].url+'">下载</a></div>'+
                    '</div>';
            $(note).append(setNote);
            setNote=lt=gurl=iOS=android=downloadUrl=null;
        },
        setStar:function(num){
            var star='';
            for (var i = 0; i < Math.floor(num); i++) {
                star+='&#xe620;';
            };
            if(Math.floor(num)!=num) star+='&#xe622;';
            for (var i = 0; i < Math.floor(5-num); i++) {
                star+='&#xe621;';
            };
            return star;
        }
    });
}) 





