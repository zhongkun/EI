$(document).ready(function(){	
    var enteredAt_x = 0,
		enteredAt_y = 0, 
		mouseEnteredAt_x = 0,
		mouseEnteredAt_y = 0,
		leftAt_x = 0,
		leftAt_y = 0,
		dampener = 3;

	$('.bobble').live('mouseenter',function (e){
	    $(this).stop(true);
		$(this).css({'left': 0, 'top': 0, 'transform': "0", position:"absolute"});
		moveable = true;
		enteredAt_y = e.pageY-$(this).offset().top;
		enteredAt_x = e.pageX-$(this).offset().left;
		mouseEnteredAt_x = e.pageX; 
		mouseEnteredAt_y = e.pageY;
	});
	$('.bobble').live('mousemove',function (e){
		var offset = $(this).offset(),
			x = e.pageX - (offset.left),
			y = e.pageY - (offset.top),
			push_x = -(enteredAt_x - x)/dampener,
			push_y = -(enteredAt_y - y)/dampener;
			
		$(this).css({'left': (push_x*2.5)});
		$(this).css({'top': push_y/1.5});
	});
	$('.bobble').live('mouseleave',function (e,x){
	    var time = 150;
        leftAt_y = (e.pageY - mouseEnteredAt_y)/dampener;
		leftAt_r = parseFloat($(this).css('transform'));
		if (leftAt_x > 20){leftAt_x = 10;}
		if (leftAt_x < -20){leftAt_x = -10;}
		if (leftAt_y > 20){leftAt_y = 10;}
		if (leftAt_y < -20){leftAt_y = -10;}
		$(this).animate({left: -leftAt_x, top: -leftAt_y, transform: 'rotate('+ -leftAt_r+'deg)'},time);
		$(this).animate({left: leftAt_x*.9,top: leftAt_y*.9, transform: 'rotate('+ leftAt_r*.9+'deg)'},time);
		$(this).animate({left: -leftAt_x*.75, top: -leftAt_y*.66, transform: 'rotate('+ -leftAt_r*.66+'deg)'},time); 
		$(this).animate({left: leftAt_x*.5,top: leftAt_y*.5, transform: 'rotate('+ leftAt_r*.5+'deg)'},time);
		$(this).animate({left: -leftAt_x*.25,top: -leftAt_y*.25, transform: 'rotate('+ -leftAt_r*.25+'deg)'},time);
		$(this).animate({left: 0, top: 0, transform: 'rotate(0deg)'},time);
	});
 });