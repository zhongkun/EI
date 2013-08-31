function include(url) {
    document.write('<script src="' + url + '"></script>');
}
var MSIE = false,
    content;

function addAllListeners() {
    $('footer ul a').hover(
        function (){
            $(this).children('img').stop().animate({'top':'-23px'},350,'easeOutExpo');
        },
        function (){
            $(this).children('img').stop().animate({'top':'0px'},350,'easeOutExpo');
        }
    );
    /*
    $('.list1>li>a,.slider figure>div>a,.list3>li>a')
    .find('strong').css('top','200px').end()
    .hover(
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').css({display:'block',opacity:'0'}).stop().animate({'opacity':1}).end() 
                .find('strong').css({'opacity':0}).stop().animate({'opacity':1,'top':'0'},350,'easeInOutExpo');
            } else { 
                $(this).children('.sitem_over').stop().show().end()
                .find('strong').stop().show().css({'top':'0'});
            }
        },
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').stop().animate({'opacity':0},1000,'easeOutQuad',function(){$(this).children('.sitem_over').css({display:'none'})}).end()  
                .find('strong').stop().animate({'opacity':0,'top':'200px'},1000,'easeOutQuad');  
            } else {
                $(this).children('.sitem_over').stop().hide().end()
                .find('strong').stop().hide();
            }            
        }
    );
    */
    $('.next').hover(
        function(){
            $(this).stop().animate({'backgroundPosition':'left center'},250,'easeOutExpo');
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'right center'},400,'easeOutCubic');
        }
    );
    $('.prev').hover(
        function(){
            $(this).stop().animate({'backgroundPosition':'right center'},250,'easeOutExpo');
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'left center'},400,'easeOutCubic');
        }
    );
}
/*splash engine*/
function showMenu(){
    $('#content>ul>li:first-child').stop(true,true).animate({'top':'-133px'},400,'easeOutBack'); 
    var cnt=0;
    $('#menu>li').each(function (ind) {
        $(this).stop(true).delay(ind*150).animate({'marginTop':'0'},400,'easeOutBack',function (){
            cnt++;
            if (cnt == $('#menu>li').length) $('.menu').css({'overflow':'visible'});
        }); 
    });
    $('.menu').css({'top':'471px'});
}

function showMenuQ(){
    $('#content>ul>li:first-child').css({'top':'-133px'}); 
    $('#menu>li').css({'marginTop':'0'}).parent('.menu').css('overflow','visible');
}

function hideMenu(){
    $('#content>ul>li:first-child').stop(true,true).delay(300).animate({'top':'-23px'},500,'easeInOutBack',function (){
        $('.menu').css({'top':'541px'});
    });
    $('#menu>li').each(function (ind) {
        $(this).stop(true).delay(ind*50).animate({'marginTop':'-350px'},500,'easeInBack'); 
    });
    $('.menu').css('overflow','hidden'); 
}

function hideMenuQ(){
    $('#content>ul>li:first-child').css({'top':'-23px'});
    $('#menu>li').css('marginTop','-350px');
}

function hideSplash(){
    var _delay = 300;
    $('.menu').css('overflow','visible').stop(true).animate({'left':'160px'},_delay*1.5,'easeOutCubic')
                                        .animate({'top':'73px'},400,'easeOutExpo')
    .find('#menu>li').each(function (ind) {
        $(this).stop(true).animate({'marginLeft':'-13px','marginRight':'-13px','marginTop':0},250,'easeOutExpo');
    }).end()
    $('.logo').stop(true).delay(_delay).animate({'top':'0px'},400,'easeOutExpo');
}
function hideSplashQ(){
    $('.menu').css({'overflow':'visible','left':'160px','top':'73px'})
        .find('#menu>li').css({'marginLeft':'-13px','marginRight':'-13px','marginTop':0});
    $('.logo').css({'top':'0px'});
}
function showSplash(prevN){
    if(prevN>0){
       $('.logo_big').trigger('click');
    }
    $('.menu').css('overflow','hidden').stop(true).animate({'top':'541px','left':'0'},400,'easeOutExpo')
    .find('#menu>li').each(function (ind) {
        $(this).stop(true).animate({'marginLeft':'2px','marginRight':'2px'/*,'marginTop':'-350px'*/},250,'easeOutExpo').delay(ind*50).animate({'marginTop':'-350px'},250,'easeInBack');
    }).end()
    $('.logo').stop(true).animate({'top':'-300px'},400,'easeInOutExpo');
    $('#content>ul>li:first-child').css({'top':'-23px'});
}

function init(){
    $('.logo_big').toggle(showMenu,hideMenu);
    initBubbles();
}

function initBubbles(){
    var decor1, decor2;
    decor1 = $('.decor').eq(0);
    decor2 = $('.decor').eq(1);
    for (var i = 0;i<18;i++){
        decor1.append('<span class="bot"><strong class="bobble"></strong></span>');
        decor1.append('<span><strong class="bobble"></strong></span>');  
        decor2.append('<span class="bot"><strong class="bobble"></strong></span>');
        decor2.append('<span><strong class="bobble"></strong></span>');           
    }
    var _delta = 15;
    if (decor1.hasClass('anim'))
        setInterval(function () {
            var num = getRandomFromRangeInt(0,35);
            var elem = decor1.find('span').eq(num).children('strong');
            var _y = parseInt(elem.css('top'));
            elem.stop(true).animate({'top':_y-_delta},300,'easeInExpo').animate({'top':_y},500,'easeOutExpo');
        },3500)
    if (decor2.hasClass('anim'))
        setInterval(function () {
            var num = getRandomFromRangeInt(0,35);
            var elem = decor2.find('span').eq(num).children('strong');           
            var _y = parseInt(elem.css('top'));
            elem.stop(true).animate({'top':_y-_delta},300,'easeInExpo').animate({'top':0},500,'easeOutExpo');
        },6000)
}
/*end splash engine*/

$(document).ready(ON_READY);
function ON_READY() {
    /*SUPERFISH MENU*/   
    $('.menu #menu').superfish({
	   delay: 800,
	   animation: {
	       height: 'show'
	   },
       speed: 'slow',
       autoArrows: false,
       dropShadows: false
    });
}

function ON_LOAD(){
    MSIE = ($.browser.msie) && ($.browser.version <= 8);
    $('.spinner').animate({'opacity':0},2000,'easeOutCubic',function (){$(this).css('display','none')});
    
    init();
    
    $('.list1>li>a,.slider figure>div>a,.list3>li>a').attr('rel','appendix')
    .prepend('<span class="sitem_over"><strong></strong></span>')
    /*
    $('.list1>li>a,.list3>li>a').fancybox({
        'transitionIn': 'elastic',
    	'transitionOut': 'elastic',
    	'speedIn': 500,
    	'speedOut': 300,
        'centerOnScroll': true,
        'titleShow': true,
        'showNavArrows' : true,
		'titlePosition' 	: 'over',
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
			return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
		}
    });
    $('.slider figure>div>a').fancybox({
        'centerOnScroll': true
    });
    */
    if ($(".slider").length) {
        $('.slider').cycle({
            fx: 'scrollHorz',
            speed: 600,
    		timeout: 0,
            next: '.next',
    		prev: '.prev',                
    		easing: 'easeInOutExpo',
    		cleartypeNoBg: true ,
            rev:0,
            startingSlide: 0,
            wrap: true
  		})
    };
    
    //content switch
    content = $('#content');
    content.tabs({
        show:0,
        preFu:function(_){
            _.li.css({'display':'none'});	
           $('.logo').stop(true).css({'top':'-300px'});
        },
        actFu:function(_){            
            if(_.curr){     
                if (_.curr.find('.slider').length) $('.slider').cycle(0);
                
                if (_.n == 0){  showSplash(_.pren);}
                else {  hideSplash(); _top = 0;}
                _.curr
                    .css({'left':'-1500px'}).stop(true).show().animate({'left':'0px'},{duration:1200,easing:'easeInOutExpo'});
                var divs = _.curr.find('>div>div>div');
                var len = divs.length;
                if (len>1)
                    divs.each(function (ind){
                        $(this).css('marginLeft','-1100px')
                        .stop(true).delay((ind)*550).animate({'marginLeft':'0'},500,'easeOutExpo');                
                    });
            }
    		if(_.prev){
  		        _.prev
                    .show().stop(true).animate({'left':'1500px'},{duration:600,easing:'easeInOutExpo',complete:function(){
                            if (_.prev){
                                _.prev.css({'display':'none'});
                            }
                        }
		              });
            }            
  		}
    });
    
    var nav = $('.menu');
    nav
    .navs({
		useHash:true,
        defHash: '#!/page_splash',
        hoverIn:function(li){
            $('>a', li).stop().animate({'backgroundPosition':'center top'},350,'easeOutExpo');
            $('>a>span',li).stop().animate({'height':'100%'},500,'easeOutCubic');
        },
        hoverOut:function(li){
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $('>a', li).stop().animate({'backgroundPosition':'center bottom'},700,'easeOutCubic');
                $('>a>span',li).stop().animate({'height':'0'},700,'easeOutCubic');
            }
        }
    })
    .navs(function(n){	
   	    $('#content').tabs(n);
   	});
    
    setTimeout(function(){  $('body').css({'overflow':'visible'}); },300);    
    addAllListeners();
    
    $(window).trigger('resize');
}

$(window).resize(function (){
    if (content) content.stop().animate({'top':(windowH()-content.height())*.5},500,'easeOutCubic');
});

function listen(evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
        var r = elem.attachEvent("on"+evnt, func);
    return r;
    }
}
listen("load", window, ON_LOAD);