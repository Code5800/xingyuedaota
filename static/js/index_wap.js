

$(function(){   

    var $slide = $('.slide'),
        $picList = $slide.find('a'),
        $picBtn = $('.slide-btn').find('li'),
        picLen = $slide.find('a').length - 1,
        currPic = 0;

    function setSlide(){
        $('.slide').height($('.slide img').height());
        $('.slide-ul>li').width($('.slide').width());
        $('.slide-ul').width($('.slide').width()*$('.slide-ul li').length);
    }
    
    $(window).load(function(){setSlide()});

    var lt
    $(window).resize(function(){
        if (lt) clearTimeout(lt);
        lt=setTimeout(function(){
            $('.slide').height('auto');
        },100);

    });

    var para={
        slideNote:'.slide',
        slideAuto:true
        
    };
    $.slideImg(para);

    var getUl=$('.recom-ul');
    var getLi=getUl.find('>li');
    var getLiWidth=getLi.eq(0).width();
    getLi.width(getLiWidth);
    getUl.width(getLi.length*getLiWidth);

    var opt={
        slideNote:'.recom-list',
        slideAuto:false,
        posStyleul: {
            left:'50%',
            marginLeft:'-27px',
            position:'absolute',
            bottom:'10px'
        }
    };
    $.slideImg(opt);

    var $getTabbox=$('.server-tab'),
        $getTabnote=$getTabbox.find('>div'),
        tabNum=0;

    $getTabnote.click(function(){
        tabNum=$(this).index();
        $getTabnote.removeClass('cos');
        $(this).addClass('cos');
        $getTabbox.siblings().hide().eq(tabNum).show();
    });

   function insertSerfun(note,opt,n) {
        var setNote='<tr>'+
                    '<td><span class="ser-tit">《'+opt.data[n].gamename+'》'+opt.data[n].servername+'</span></td>'+
                    '<td>'+opt.data[n].start_time+'</td>'+
                    '<td><a class="iconfont lb"  href="/Wap/Package/index?gid='+opt.data[n].gid+'">&#xe61d;</a></td>'+
                    '<td><a class="iconfont xz" title="《'+opt.data[n].gamename+'》'+opt.data[n].servername+'" href="'+opt.data[n].url+'">&#xe61e;</a></td>'+
                '</tr>';
        $(note).append(setNote);
        setNote=null;
    }

    function updateNewGameDownLink(){
        var gameLinkList = $(".game-list-box").find(".js-down-link");
        gameLinkList.each(function(){
            var iosLink = $(this).data("ios");
            var androidLink = $(this).data("android");
            var link = isIOS?iosLink:androidLink;
            if(link){
                 $(this).attr("href",link);
            }else{
                 $(this).attr("href","javascript:alert('此游戏暂无IOS版本')");
            }

        })
    }
    //updateNewGameDownLink(); 
    var $getSer=$('#server'),
        $insertSer=$('.server-table');

    var topt={
        pno:1,
        psize:10,
        order:'DESC',
        is_osl:1
    };
    $getSer.click(function(){
        topt.pno++;
        $getSer.html('加载中···');
        $.sortRequest(topt,function(){
            $getSer.html('查看更多');
            var maxpno=Math.ceil(sortData.total/topt.psize);
            if(sortData.data.length > 0) {
                for (var i = 0; i < sortData.data.length; i++) {
                    insertSerfun($insertSer,sortData,i);
                }
            } else {
                $getSer.html('已经到底了');
            }
            if(topt.pno>=maxpno){
                $getSer.parent().hide();
            }
            maxpno=null;
        }); 
    });
    
}) 
