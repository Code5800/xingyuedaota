


var account;
$(function(){
  var opt={
    slideNote:'.model-hidden-box'
  };
  $.slideImg(opt);
  var rotate=240/320,lastTime;
  function setHeight() {
    $(opt.slideNote).height($(opt.slideNote).width()*rotate);
  }
  setHeight();
  $(window).resize(function(){
    if (lastTime) clearTimeout(lastTime);
    lastTime=setTimeout(function(){
        setHeight();
    },100);
  });



});
