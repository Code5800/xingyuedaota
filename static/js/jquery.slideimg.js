$(function(){
    $.extend({
        slideImg:function(opt){
            var obj=new Object();
            obj={
                slideNote:'',
                slideNum:1,
                slideSpeed:500,
                slideStep:3500,
                slideAuto:true,
                slidePos:true,
                posStyleul:{
                    position:'absolute',
                    right:'15px',
                    bottom:'10px'
                },
                posStyleli:{
                    float:'left',
                    width:'10px',
                    height:'10px',
                    borderRadius:'5px',
                    backgroundColor:'#b2b2b2',
                    marginLeft:'8px',
                    overflow:'hidden',
                    textIndent:'-100em'
                },
                posCurr:{backgroundColor:'#ff5400'}
            };
            obj=$.extend(obj,opt);
            var autoPlay,noetWidth,MoveSize,lastTime,getNote,getSon,getGrandson,posUl,posLi,Num,pos=0;
            function getDom() {
                getNote=$(obj.slideNote);
                getSon=getNote.children().first();
                getGrandson=getSon.children();
            }
            function setWidth(){
                noetWidth=getNote.width();
                getGrandson.width(noetWidth);
                Num=getGrandson.length;
                getSon.width(noetWidth*Num);
                MoveSize=noetWidth*obj.slideNum;
            }
            function setPos() {
                posNote=$('<ul class="pos-ul"></ul>');
                posNote.css(obj.posStyleul);
                for (var i = 0; i < getGrandson.length; i++) {
                    posLi=$('<li>'+i+'</li>');
                    posLi.css(obj.posStyleli);
                    posNote.append(posLi);
                };
                getNote.append(posNote);
                posNote=$(obj.slideNote+' .pos-ul');
                posLi=posNote.find('li');
                posLi.first().css(obj.posCurr);
            }
            getDom();
            setWidth();
            if(obj.slidePos) setPos(); 
            
            $(window).resize(function(){
                if (lastTime) clearTimeout(lastTime);
                lastTime=setTimeout(function(){
                    setWidth();
                },100);
            });
            function slideRight() {
                getDom();
                pos--;
                if(pos<0) pos=Num-1;
                posLi.css({backgroundColor:obj.posStyleli.backgroundColor}).eq(pos).css(obj.posCurr);
                getGrandson.last().prependTo(getSon);
                getSon.css({ "margin-left": -MoveSize });
                getSon.animate({ "margin-left": "0px" }, obj.slideSpeed);
            }
            function slideLeft() {
                getDom();
                pos++;
                if(pos>Num-1) pos=0;
                posLi.css({backgroundColor:obj.posStyleli.backgroundColor}).eq(pos).css(obj.posCurr);
                getSon.animate({ "margin-left": -MoveSize }, obj.slideSpeed, function () {
                    getGrandson.first().appendTo(getSon);
                    getSon.css({ "margin-left": "0px" });
                });
            }

            var e, _cx1, _cx2, _cy1, _cy2;
            getNote.on('touchstart', function(event){
                e = (event.originalEvent || event).targetTouches[0];
                _cx1 = e.clientX;
                _cy1 = e.clientY;
                clearInterval(autoPlay);
            });

            getNote.on('touchmove', function(event){
                e = (event.originalEvent || event).targetTouches[0];
                _cx2 = e.clientX;
                _cy2 = e.clientY;

                var disx = Math.abs(_cx2 -_cx1);
                var disy = Math.abs(_cy2 -_cy1);

                if(disy == 0 || disy/disx<1){
                    event.preventDefault();
                }

            });

            getNote.on('touchend touchcancel', function(event){
                if(Math.abs(_cx2 - _cx1) > Math.abs(_cy2 - _cy1)){
                    if(_cx2&&_cx2 - _cx1 < -100){
                        slideLeft();
                    }else if(_cx2&&_cx2 - _cx1 >100){
                        slideRight();
                    }
                }
                _cx1 = _cx2 = _cy1 = _cy2 = null;
                if (obj.slideAuto) {
                    autoPlay = setInterval(function () { slideLeft() }, obj.slideStep);
                }
            })

            if (obj.slideAuto) {
                autoPlay = setInterval(function () { slideLeft() }, obj.slideStep);
            }
        }
    });

});